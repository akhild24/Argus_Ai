"""
app.py — Argus AI FastAPI Backend
Team Argus | UDB-S7BT
Hyper-Personalized Learning Assistant for Underserved Students
"""

import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.models import ExplainRequest, QuizRequest, CareerRequest, AIResponse, StudentProfile
from backend.prompts import get_explain_prompt, get_quiz_prompt, get_career_prompt
from backend.gemini_client import ask

app = FastAPI(
    title="Argus AI — Project UDAAN",
    description="Hyper-Personalized Physics Learning Assistant for Underserved Students",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend
app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
async def root():
    return FileResponse("frontend/index.html")


@app.get("/health")
async def health():
    return {"status": "ok", "project": "UDAAN", "team": "Argus", "code": "UDB-S7BT"}


@app.post("/explain", response_model=AIResponse)
async def explain(req: ExplainRequest):
    """Generate a personalized physics explanation."""
    try:
        profile = StudentProfile(
            style=req.profile.style,
            level=req.profile.level,
            language=req.profile.language
        )
        prompt = get_explain_prompt(req.question, profile)
        result = await ask(prompt)
        return AIResponse(result=result)
    except EnvironmentError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")


@app.post("/quiz", response_model=AIResponse)
async def quiz(req: QuizRequest):
    """Generate an adaptive quiz on a physics topic."""
    try:
        profile = StudentProfile(
            style="conceptual",
            level=req.profile.level,
            language=req.profile.language
        )
        prompt = get_quiz_prompt(req.topic, profile)
        result = await ask(prompt)

        # Validate JSON response
        try:
            parsed = json.loads(result)
            return AIResponse(result=json.dumps(parsed), topic=req.topic)
        except json.JSONDecodeError:
            # Try to extract JSON from response if wrapped in markdown
            import re
            match = re.search(r'\{.*\}', result, re.DOTALL)
            if match:
                return AIResponse(result=match.group(), topic=req.topic)
            return AIResponse(result=result, topic=req.topic)

    except EnvironmentError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")


@app.post("/career", response_model=AIResponse)
async def career(req: CareerRequest):
    """Generate personalized career guidance."""
    try:
        profile = StudentProfile(
            style="conceptual",
            level=req.profile.level,
            language=req.profile.language
        )
        prompt = get_career_prompt(profile, req.interests)
        result = await ask(prompt)
        return AIResponse(result=result)
    except EnvironmentError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")
