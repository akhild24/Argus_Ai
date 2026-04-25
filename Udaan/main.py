import json
import os
import random
import time
from collections import deque

import httpx
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from auth import create_access_token, decode_token, hash_password, oauth2_scheme, verify_password
from database import create_user, get_user_by_email, get_user_by_id, update_user_progress
from models import (
    ExplainRequest,
    ExplainResponse,
    OpportunityResponse,
    Profile,
    ProgressUpdate,
    QuizRequest,
    QuizResponse,
    ReexplainRequest,
    ReexplainResponse,
    RegisterRequest,
    LoginRequest,
    TokenResponse,
)
from prompts import (
    get_explain_prompt,
    get_opportunities_prompt,
    get_quiz_prompt,
    get_reexplain_prompt,
)

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash-lite")
GEMINI_MODELS = [
    model.strip()
    for model in os.getenv(
        "GEMINI_MODELS",
        f"{GEMINI_MODEL},gemini-2.5-flash,gemini-2.0-flash",
    ).split(",")
    if model.strip()
]
GEMINI_MODELS = list(dict.fromkeys(GEMINI_MODELS))
GEMINI_TIMEOUT_SECONDS = float(os.getenv("GEMINI_TIMEOUT_SECONDS", "12"))
GEMINI_API_BASE_URL = os.getenv(
    "GEMINI_API_BASE_URL",
    "https://generativelanguage.googleapis.com/v1beta",
)
GEMINI_RECENT_WINDOW = int(os.getenv("GEMINI_RECENT_WINDOW", "12"))

recent_ai_outputs: deque[str] = deque(maxlen=GEMINI_RECENT_WINDOW)

app = FastAPI(title="Udaan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEFAULT_PROFILE = {
    "level": "beginner",
    "style": "definition",
    "language": "English",
    "subject": "python",
    "degree": None,
    "city": None,
    "hiddenSkill": None,
    "experience": None,
}


def _model_dump(model):
    if hasattr(model, "model_dump"):
        return model.model_dump(exclude_none=True)
    return model.dict(exclude_none=True)


def _profile_from_source(source=None) -> Profile:
    data = dict(DEFAULT_PROFILE)
    if isinstance(source, Profile):
        data.update(_model_dump(source))
    elif isinstance(source, dict):
        data.update({key: value for key, value in source.items() if value is not None})
    return Profile(**data)


def _user_profile(user: dict, override: Profile | None = None) -> Profile:
    if override:
        return _profile_from_source(override)
    return _profile_from_source(user.get("profile", {}))


def _extract_response_text(response) -> str:
    if isinstance(response, dict):
        chunks = []
        for candidate in response.get("candidates", []) or []:
            content = candidate.get("content", {}) or {}
            for part in content.get("parts", []) or []:
                part_text = part.get("text", "")
                if part_text:
                    chunks.append(part_text)
        return "\n".join(chunks).strip()

    try:
        text = getattr(response, "text", "")
        if text:
            return text.strip()
    except Exception:
        pass

    chunks = []
    for candidate in getattr(response, "candidates", []) or []:
        content = getattr(candidate, "content", None)
        for part in getattr(content, "parts", []) or []:
            part_text = getattr(part, "text", "")
            if part_text:
                chunks.append(part_text)

    return "\n".join(chunks).strip()


def _with_variation(prompt: str, *, purpose: str) -> str:
    marker = f"{purpose}-{int(time.time() * 1000)}-{random.randint(1000, 9999)}"
    return f"""{prompt}

Freshness rules:
- Do not repeat wording, examples, quiz options, or event titles from earlier answers in this session.
- Use a new angle suitable for a live demo.
- Internal variation marker, do not mention or print it: {marker}
"""


def _similar_to_recent(text: str) -> bool:
    compact = " ".join(text.lower().split())
    if not compact:
        return False
    for old in recent_ai_outputs:
        if compact == old or (len(compact) > 80 and compact[:120] == old[:120]):
            return True
    return False


async def _generate_gemini_text(prompt: str, *, expect_json: bool = False, purpose: str = "general") -> tuple[str, str]:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    prompt = _with_variation(prompt, purpose=purpose)
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ],
        "generationConfig": {
            "temperature": 0.85 if not expect_json else 0.75,
            "topP": 0.92,
            "topK": 40,
            "maxOutputTokens": 900 if expect_json else 650,
        },
    }
    if expect_json:
        payload["generationConfig"]["responseMimeType"] = "application/json"

    errors = []
    async with httpx.AsyncClient(timeout=GEMINI_TIMEOUT_SECONDS) as client:
        for model in GEMINI_MODELS:
            url = f"{GEMINI_API_BASE_URL}/models/{model}:generateContent"
            try:
                response = await client.post(url, params={"key": GEMINI_API_KEY}, json=payload)
                response.raise_for_status()
                text = _extract_response_text(response.json())
                if not text:
                    raise ValueError("Gemini returned an empty response")
                if _similar_to_recent(text):
                    payload["contents"][0]["parts"][0]["text"] = _with_variation(prompt, purpose=f"{purpose}-retry")
                    response = await client.post(url, params={"key": GEMINI_API_KEY}, json=payload)
                    response.raise_for_status()
                    text = _extract_response_text(response.json())
                    if not text:
                        raise ValueError("Gemini returned an empty retry response")
                recent_ai_outputs.append(" ".join(text.lower().split()))
                return text, model
            except (httpx.TimeoutException, httpx.NetworkError, httpx.HTTPStatusError, ValueError) as exc:
                status = exc.response.status_code if isinstance(exc, httpx.HTTPStatusError) else None
                errors.append(f"{model}: {type(exc).__name__}{f' {status}' if status else ''}")
                if status and status not in {400, 403, 408, 409, 429, 500, 502, 503, 504}:
                    break

    raise RuntimeError(f"Gemini unavailable after failover: {'; '.join(errors)}")


def _parse_json_object(raw: str) -> dict:
    cleaned = raw.strip()
    cleaned = cleaned.replace("```json", "").replace("```JSON", "").replace("```", "").strip()
    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start == -1 or end == -1 or end < start:
        raise ValueError("Gemini response did not contain a JSON object")
    return json.loads(cleaned[start : end + 1])


def _fallback_explain(question: str, profile: Profile) -> ExplainResponse:
    subject = profile.subject.replace("_", " ").title()
    variants = [
        f"Think of {question} as one small tool in {subject}. First notice what problem it solves, then try one tiny example yourself. That turns the idea from memory into skill.",
        f"A simple way to see it: {question} is not just theory. It is a pattern you can recognize, practise once, and reuse when a similar problem appears.",
        f"Break it into three parts: what it is, when you use it, and one example. If you can explain those three in your own words, you have understood it.",
    ]
    return ExplainResponse(
        explanation=random.choice(variants),
        mode_used=profile.style or "fallback",
        source="fallback",
        model="local-varied",
    )


def _fallback_quiz(topic: str) -> QuizResponse:
    templates = [
        {
            "question": f"Which question best checks whether you understood {topic}?",
            "options": [
                {"id": "a", "text": "Can I explain where it is used?"},
                {"id": "b", "text": "Can I avoid practising it?"},
                {"id": "c", "text": "Can I ignore the examples?"},
                {"id": "d", "text": "Can I memorize only the title?"},
            ],
            "correct_answer": "a",
            "explanation": f"Understanding {topic} means knowing its purpose and where to apply it.",
        },
        {
            "question": f"What should you do first when learning {topic}?",
            "options": [
                {"id": "a", "text": "Connect it to a small real example"},
                {"id": "b", "text": "Skip the basics"},
                {"id": "c", "text": "Only read the heading"},
                {"id": "d", "text": "Change the subject"},
            ],
            "correct_answer": "a",
            "explanation": f"A small example makes {topic} easier to remember and explain.",
        },
        {
            "question": f"Why is {topic} useful?",
            "options": [
                {"id": "a", "text": "It gives a reusable way to solve a problem"},
                {"id": "b", "text": "It removes the need to practise"},
                {"id": "c", "text": "It only matters in exams"},
                {"id": "d", "text": "It hides mistakes automatically"},
            ],
            "correct_answer": "a",
            "explanation": f"{topic} becomes useful when you can reuse it in new problems.",
        },
    ]
    selected = random.choice(templates)
    return QuizResponse(
        **selected,
        source="fallback",
        model="local-varied",
    )


def _fallback_reexplain(topic: str, profile: Profile, previous_mode: str) -> ReexplainResponse:
    variants = [
        f"New angle: imagine {topic} as a shortcut your brain can reuse. Do one tiny example, say what changed, then say why it changed.",
        f"Let's switch approach. Instead of defining {topic}, ask: what problem would become slower or messier without it?",
        f"If the earlier explanation did not land, try this: explain {topic} to a friend using only one everyday example and one sentence.",
    ]
    new_mode = "definition" if previous_mode != "definition" else "example"
    return ReexplainResponse(
        explanation=random.choice(variants),
        new_mode=new_mode,
        source="fallback",
        model="local-varied",
    )


def _fallback_opportunities(profile: Profile) -> OpportunityResponse:
    city = profile.city or "Online"
    subject = profile.subject.replace("_", " ").title()
    categories = [profile.subject, "career"]
    return OpportunityResponse(
        events=[
            {
                "title": f"Free {subject} Project Jam",
                "org": "Udaan Learning",
                "date": "This weekend",
                "city": city,
                "category": categories,
            },
            {
                "title": f"{subject} Resume Sprint",
                "org": "Campus Career Circle",
                "date": "Next week",
                "city": "Online",
                "category": ["resume", profile.subject],
            },
            {
                "title": "Peer Mock Interview Night",
                "org": "Student Builders India",
                "date": "Open registration",
                "city": city,
                "category": ["interview", "networking"],
            },
            {
                "title": f"Beginner {subject} Portfolio Clinic",
                "org": "Open Skills Hub",
                "date": "This month",
                "city": "Hybrid",
                "category": ["portfolio", profile.subject],
            },
            {
                "title": "Internship Discovery Session",
                "org": "Local Startup Network",
                "date": "Friday evening",
                "city": city,
                "category": ["internship", "career"],
            },
        ],
        bridge=f"Keep learning {subject}; each small skill makes internships, projects, and entry-level roles easier to reach.",
        source="fallback",
        model="local-varied",
    )


@app.get("/")
def root():
    return {"status": "Udaan backend is running"}


@app.post("/auth/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    email = request.email.strip().lower()
    existing = await get_user_by_email(email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = {
        "name": request.name,
        "email": email,
        "password": hash_password(request.password),
        "level": request.level,
        "style": request.style,
        "language": request.language,
        "subject": request.subject,
        "city": request.city,
        "degree": request.degree,
        "hiddenSkill": request.hiddenSkill,
        "experience": request.experience,
    }
    user_id = await create_user(user_data)
    token = create_access_token(user_id)
    return TokenResponse(access_token=token)


@app.post("/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user = await get_user_by_email(request.email.strip().lower())
    if not user or not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(str(user["_id"]))
    return TokenResponse(access_token=token)


@app.get("/auth/me")
async def get_me(token: str = Depends(oauth2_scheme)):
    user_id = decode_token(token)
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "profile": user.get("profile", {}),
        "progress": user.get("progress", 0),
    }


@app.patch("/auth/progress")
async def update_progress(body: ProgressUpdate, token: str = Depends(oauth2_scheme)):
    user_id = decode_token(token)
    updated = await update_user_progress(user_id, body.progress)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "progress updated"}


@app.post("/explain", response_model=ExplainResponse)
async def explain(request: ExplainRequest, token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        profile = _user_profile(user, request.profile)
        prompt = get_explain_prompt(request.question, profile)
        text, model = await _generate_gemini_text(prompt, purpose="explain")
        return ExplainResponse(explanation=text, mode_used=profile.style, source="ai", model=model)
    except HTTPException:
        raise
    except Exception as exc:
        print(f"Explain error: {exc}")
        return _fallback_explain(request.question, _profile_from_source(request.profile))


@app.post("/quiz", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest, token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        stored_profile = _user_profile(user)
        level = request.level or stored_profile.level
        language = request.language or stored_profile.language
        prompt = get_quiz_prompt(request.topic, level, language)
        raw, model = await _generate_gemini_text(prompt, expect_json=True, purpose="quiz")
        data = _parse_json_object(raw)
        return QuizResponse(**data, source="ai", model=model)
    except HTTPException:
        raise
    except Exception as exc:
        print(f"Quiz error: {exc}")
        return _fallback_quiz(request.topic)


@app.post("/reexplain", response_model=ReexplainResponse)
async def reexplain(request: ReexplainRequest, token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        profile = _user_profile(user, request.profile)
        new_mode = "definition" if request.previous_mode != "definition" else "example"
        prompt = get_reexplain_prompt(request.topic, profile, request.previous_mode)
        text, model = await _generate_gemini_text(prompt, purpose="reexplain")
        return ReexplainResponse(explanation=text, new_mode=new_mode, source="ai", model=model)
    except HTTPException:
        raise
    except Exception as exc:
        print(f"Reexplain error: {exc}")
        return _fallback_reexplain(request.topic, _profile_from_source(request.profile), request.previous_mode)


@app.get("/opportunities", response_model=OpportunityResponse)
async def get_opportunities(token: str = Depends(oauth2_scheme)):
    profile = Profile(**DEFAULT_PROFILE)
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        profile = _user_profile(user)
        prompt = get_opportunities_prompt(
            profile.city or "Delhi",
            profile.subject or "General",
            profile.degree or "N/A",
            profile.level or "beginner",
        )
        raw, model = await _generate_gemini_text(prompt, expect_json=True, purpose="opportunities")
        data = _parse_json_object(raw)
        return OpportunityResponse(**data, source="ai", model=model)
    except HTTPException:
        raise
    except Exception as exc:
        print(f"Opportunities error: {exc}")
        return _fallback_opportunities(profile)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
