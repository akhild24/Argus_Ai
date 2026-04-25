from pydantic import BaseModel

class Profile(BaseModel):
    level: str       # "beginner" | "intermediate" | "advanced"
    style: str       # "example" | "definition" | "hands_on"
    language: str    # "english" | "hindi" | "hinglish"
    subject: str     # "python" | "data_science" | "govt_exam"

class ExplainRequest(BaseModel):
    question: str
    profile: Profile

class ExplainResponse(BaseModel):
    explanation: str
    mode_used: str   # Returns the style that was used
