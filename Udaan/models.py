from pydantic import BaseModel, Field
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
    profile: Optional[Profile] = None

class ExplainResponse(BaseModel):
    explanation: str
    mode_used: str
    source: str = "ai"
    model: Optional[str] = None

class QuizRequest(BaseModel):
    topic: str
    level: str
    language: str

class QuizOption(BaseModel):
    id: str
    text: str

class QuizResponse(BaseModel):
    question: str
    options: list[QuizOption]
    correct_answer: str
    explanation: str
    source: str = "ai"
    model: Optional[str] = None

class ReexplainRequest(BaseModel):
    topic: str
    profile: Optional[Profile] = None
    previous_mode: str

class ReexplainResponse(BaseModel):
    explanation: str
    new_mode: str
    source: str = "ai"
    model: Optional[str] = None

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
    progress: int = Field(ge=0, le=100)

class OpportunityEvent(BaseModel):
    title: str
    org: str
    date: str
    city: str
    category: list[str]

class OpportunityResponse(BaseModel):
    events: list[OpportunityEvent]
    bridge: str
    source: str = "ai"
    model: Optional[str] = None
