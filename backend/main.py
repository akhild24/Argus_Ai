import json
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

from models import QuizRequest, QuizResponse, QuizOption, ReexplainRequest, ReexplainResponse
from prompts import get_quiz_prompt, get_reexplain_prompt

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(title="Udaan API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"status": "Udaan backend is running"}


@app.post("/quiz", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest):
    try:
        prompt = get_quiz_prompt(request.topic, request.level, request.language)
        response = model.generate_content(prompt)

        # Clean response: strip markdown code fences if present
        raw = response.text.strip()
        if raw.startswith("```json"):
            raw = raw[7:]
        if raw.startswith("```"):
            raw = raw[3:]
        if raw.endswith("```"):
            raw = raw[:-3]
        raw = raw.strip()

        data = json.loads(raw)

        return QuizResponse(
            question=data["question"],
            options=[QuizOption(**opt) for opt in data["options"]],
            correct_answer=data["correct_answer"],
            explanation=data["explanation"],
        )
    except Exception:
        # Fallback: hardcoded demo MCQ about for loops
        return QuizResponse(
            question="What does a for loop do in Python?",
            options=[
                QuizOption(id="a", text="Repeats a block of code for each item in a sequence"),
                QuizOption(id="b", text="Defines a new function"),
                QuizOption(id="c", text="Deletes a variable"),
                QuizOption(id="d", text="Imports a module"),
            ],
            correct_answer="a",
            explanation="A for loop iterates over items in a sequence like a list, string, or range, executing the loop body once for each item.",
        )


@app.post("/reexplain", response_model=ReexplainResponse)
async def reexplain(request: ReexplainRequest):
    try:
        if request.previous_mode != "definition":
            new_mode = "definition"
        else:
            new_mode = "example"

        prompt = get_reexplain_prompt(
            request.topic,
            request.profile.model_dump(),
            request.previous_mode,
        )
        response = model.generate_content(prompt)

        return ReexplainResponse(
            explanation=response.text.strip(),
            new_mode=new_mode,
        )
    except Exception:
        # Fallback: hardcoded demo explanation for for loops
        return ReexplainResponse(
            explanation="Let me try explaining this differently... A for loop is like reading a guest list at a party. You go through each name one by one and greet them. In Python, 'for name in names' picks each name from the list and lets you do something with it, like print it. Once all names are done, the loop stops.",
            new_mode="analogy",
        )
