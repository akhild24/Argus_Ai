from database import get_user_by_email, get_user_by_id, create_user, update_user_progress
from auth import hash_password, verify_password, create_access_token, decode_token, oauth2_scheme
from models import RegisterRequest, LoginRequest, TokenResponse, ProgressUpdate, OpportunityEvent
import os
import json
import google.generativeai as genai
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import (
    Profile,
    ExplainRequest,
    ExplainResponse,
    QuizRequest,
    QuizResponse,
    ReexplainRequest,
    ReexplainResponse
)
from prompts import get_explain_prompt, get_quiz_prompt, get_reexplain_prompt, get_opportunities_prompt

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(title="Udaan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Udaan backend is running"}

@app.post("/auth/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    existing = await get_user_by_email(request.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_data = {
        "name": request.name,
        "email": request.email,
        "password": hash_password(request.password),
        "level": request.level,
        "style": request.style,
        "language": request.language,
        "subject": request.subject,
        "city": request.city,
        "degree": request.degree,
        "hiddenSkill": request.hiddenSkill,
        "experience": request.experience
    }
    user_id = await create_user(user_data)
    token = create_access_token(user_id)
    return TokenResponse(access_token=token)

@app.post("/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user = await get_user_by_email(request.email)
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
        "name": user["name"],
        "email": user["email"],
        "profile": user["profile"],
        "progress": user["progress"]
    }

@app.patch("/auth/progress")
async def update_progress(body: ProgressUpdate, token: str = Depends(oauth2_scheme)):
    user_id = decode_token(token)
    await update_user_progress(user_id, body.progress)
    return {"status": "progress updated"}

@app.post("/explain", response_model=ExplainResponse)
async def explain(request: ExplainRequest, token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        profile = type('Profile', (), user["profile"])()
        prompt = get_explain_prompt(request.question, profile)
        response = model.generate_content(prompt)
        return ExplainResponse(explanation=response.text.strip(), mode_used=user["profile"]["style"])
    except HTTPException:
        raise
    except Exception:
        return ExplainResponse(explanation="Ek for loop ek kaam ko baar baar karta hai.", mode_used="fallback")

@app.post("/quiz", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest, token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        profile = user["profile"]
        prompt = get_quiz_prompt(request.topic, profile["level"], profile["language"])
        response = model.generate_content(prompt)
        raw = response.text.strip().replace("```json", "").replace("```", "")
        data = json.loads(raw)
        return QuizResponse(**data)
    except HTTPException:
        raise
    except Exception:
        return QuizResponse(
            question="Python mein for loop kya karta hai?",
            options=["Loop chalaata hai", "Variable banata hai", "Function define karta hai", "Import karta hai"],
            correct_answer="a",
            explanation="For loop ek sequence ke har element pe ek kaam karta hai."
        )

@app.post("/reexplain", response_model=ReexplainResponse)
async def reexplain(request: ReexplainRequest, token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        profile = type('Profile', (), user["profile"])()
        new_mode = "definition" if request.previous_mode != "definition" else "example"
        prompt = get_reexplain_prompt(request.topic, profile, request.previous_mode)
        response = model.generate_content(prompt)
        return ReexplainResponse(explanation=response.text.strip(), new_mode=new_mode)
    except HTTPException:
        raise
    except Exception:
        return ReexplainResponse(explanation="Let me try explaining this differently... For loop ek dabba hai jisme sab cheezein ek ek karke nikalti hain.", new_mode="example")

@app.get("/opportunities")
async def get_opportunities(token: str = Depends(oauth2_scheme)):
    try:
        user_id = decode_token(token)
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        profile = user.get("profile", {})
        city = profile.get("city", "Delhi")
        subject = profile.get("subject", "General")
        degree = profile.get("degree", "N/A")
        level = profile.get("level", "Beginner")
        
        prompt = get_opportunities_prompt(city, subject, degree, level)
        response = model.generate_content(prompt)
        raw = response.text.strip().replace("```json", "").replace("```", "")
        data = json.loads(raw)
        return data
    except Exception:
        return {
            "events": [
                {
                    "title": "Skills for the Future Workshop",
                    "org": "Udaan Learning",
                    "date": "Next Saturday",
                    "city": "Online",
                    "category": ["Career", "Skills"]
                }
            ],
            "bridge": "Learning new skills today opens doors to better roles and higher pay in your field."
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
