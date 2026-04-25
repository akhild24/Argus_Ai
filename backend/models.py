from pydantic import BaseModel
from dataclasses import dataclass
from typing import Literal


# ──────────────────────────────────────────
#  Student Profile
# ──────────────────────────────────────────

@dataclass
class StudentProfile:
    style: Literal["conceptual", "mathematical", "analogy", "research"] = "conceptual"
    level: Literal["beginner", "intermediate", "advanced"] = "intermediate"
    language: Literal["english", "hindi", "hinglish"] = "english"


# ──────────────────────────────────────────
#  API Request / Response Models
# ──────────────────────────────────────────

class ProfilePayload(BaseModel):
    style: str = "conceptual"
    level: str = "intermediate"
    language: str = "english"


class ExplainRequest(BaseModel):
    question: str
    profile: ProfilePayload


class QuizRequest(BaseModel):
    topic: str
    profile: ProfilePayload


class CareerRequest(BaseModel):
    profile: ProfilePayload
    interests: str = ""


class AIResponse(BaseModel):
    result: str
    topic: str = ""
