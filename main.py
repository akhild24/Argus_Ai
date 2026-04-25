import os
from google import genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import ExplainRequest, ExplainResponse
from prompts import get_explain_prompt, get_fallback_response

# Load environment variables
load_dotenv()

# Configure Gemini (Adapted to use new google-genai SDK based on earlier tests)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables!")

client = genai.Client(api_key=GEMINI_API_KEY)

# Create FastAPI app
app = FastAPI(
    title="UDAAN API",
    description="AI-powered learning platform for Indian students",
    version="1.0.0"
)

# Add CORS - CRITICAL for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
def health_check():
    return {
        "status": "UDAAN backend is running",
        "version": "1.0.0",
        "endpoints": ["/explain", "/health"]
    }

@app.get("/health")
def detailed_health():
    """Detailed health check for debugging"""
    api_key_present = bool(GEMINI_API_KEY)
    return {
        "status": "healthy",
        "gemini_api_configured": api_key_present,
        "gemini_api_key_prefix": GEMINI_API_KEY[:10] if api_key_present else None
    }


@app.post("/explain", response_model=ExplainResponse)
async def explain(request: ExplainRequest):
    """Enhanced with edge case handling"""
    
    # Validate question isn't empty
    if not request.question or request.question.strip() == "":
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    # Validate profile fields
    valid_levels = ["beginner", "intermediate", "advanced"]
    valid_styles = ["example", "definition", "hands_on"]
    valid_languages = ["english", "hindi", "hinglish"]
    
    if request.profile.level not in valid_levels:
        raise HTTPException(status_code=400, detail=f"Invalid level. Must be one of: {valid_levels}")
    
    if request.profile.style not in valid_styles:
        raise HTTPException(status_code=400, detail=f"Invalid style. Must be one of: {valid_styles}")
    
    if request.profile.language not in valid_languages:
        raise HTTPException(status_code=400, detail=f"Invalid language. Must be one of: {valid_languages}")
        
    try:
        # Generate prompt
        prompt = get_explain_prompt(request.question, request.profile)
        
        # Call Gemini API using the updated SDK and model
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        
        # Extract text
        explanation_text = response.text.strip()
        
        # Handle empty responses
        if not explanation_text:
            raise ValueError("Gemini returned empty response")
        
        # Return response
        return ExplainResponse(
            explanation=explanation_text,
            mode_used=request.profile.style
        )
    
    except Exception as e:
        # Log error for debugging
        print(f"ERROR in /explain: {str(e)}")
        
        # Try fallback
        try:
            fallback_text = get_fallback_response(
                request.question, 
                request.profile.language
            )
            return ExplainResponse(
                explanation=fallback_text,
                mode_used=request.profile.style
            )
        except:
            # Last resort
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to generate explanation: {str(e)}"
            )

# Add uvicorn runner at the end
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True  # Auto-reload on code changes
    )
