from pydantic import BaseModel


class Profile(BaseModel):
    level: str
    style: str
    language: str
    subject: str


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


class ReexplainRequest(BaseModel):
    topic: str
    profile: Profile
    previous_mode: str


class ReexplainResponse(BaseModel):
    explanation: str
    new_mode: str
