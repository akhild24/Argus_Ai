from pydantic import BaseModel
from typing import Optional

class Profile(BaseModel):
    level: str
    style: str
    language: str
    subject: str
    degree: Optional[str] = None
    city: Optional[str] = None
    hiddenSkill: Optional[str] = None
    experience: Optional[str] = None

class ExplainRequest(BaseModel):
    question: str

class ExplainResponse(BaseModel):
    explanation: str
    mode_used: str

class QuizRequest(BaseModel):
    topic: str
    level: str
    language: str

class QuizResponse(BaseModel):
    question: str
    options: list[str]
    correct_answer: str
    explanation: str

class ReexplainRequest(BaseModel):
    topic: str
    previous_mode: str

class ReexplainResponse(BaseModel):
    explanation: str
    new_mode: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    level: str
    style: str
    language: str
    subject: str
    city: str
    degree: Optional[str] = None
    hiddenSkill: Optional[str] = None
    experience: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ProgressUpdate(BaseModel):
    progress: int

class OpportunityEvent(BaseModel):
    title: str
    org: str
    date: str
    city: str
    category: list[str]