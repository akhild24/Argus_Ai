def get_explain_prompt(question: str, profile) -> str:
    """
    This is your antigravity engine. 
    Every word matters. Test each variation.
    """
    
    # Style instructions - how to STRUCTURE the answer
    style_instructions = {
        "example": """Give a real Indian daily-life example FIRST (use familiar scenarios: chai shop, cricket, local train, vegetable market, mobile recharge).
Then explain the concept in 2-3 simple sentences.
End with one line connecting it back to the example.""",
        
        "definition": """Start with ONE clear definition in simple words (no jargon).
Then give 3 short bullet points that break it down.
Keep each bullet to one sentence.""",
        
        "hands_on": """Give a tiny practical task FIRST (something they can try in 2 minutes).
Then explain WHY that task demonstrates the concept.
Keep it actionable - use words like 'try this', 'notice what happens'."""
    }

    # Level instructions - how SIMPLE to be
    level_instructions = {
        "beginner": """Use ZERO jargon. Explain like the student is 16 years old and has never coded before.
If you must use a technical term, immediately define it in simple words.
Use everyday analogies (don't use 'memory allocation' - say 'like keeping things in different boxes').
Assume they know: basic math, using a phone, Google search. Nothing else.""",
        
        "intermediate": """Use normal programming terms but keep explanations simple.
The student knows variables, loops, basic syntax.
Don't over-explain basics, but don't assume advanced concepts.
Focus on making connections between concepts.""",
        
        "advanced": """Be technical and direct. Use proper terminology.
The student knows data structures, algorithms basics.
Focus on WHY and WHEN, not WHAT.
You can reference other concepts without re-explaining them."""
    }

    # Language instructions - CRITICAL for demo
    language_instructions = {
        "english": "Respond in simple, clear English. Use short sentences.",
        
        "hindi": """Respond FULLY in simple Hindi using Devanagari script.
Use English ONLY for: code snippets, function names, technical terms that have no Hindi equivalent.
Example: "Variable ek aisa box hai jismein aap value store karte hain, jaise x = 5"
Keep Hindi simple - avoid complex Sanskrit words. Use everyday conversational Hindi.""",
        
        "hinglish": """Respond in natural Hinglish (mix Hindi and English naturally).
Example: "Variable ko ek box samjho jismein aap value store karte ho, like x = 5"
Use Hindi for connecting words (ko, ko, ka, ke, hai, hota) and explanations.
Use English for technical terms and code.
Make it sound like how Indians actually talk - not forced translation."""
    }

    return f"""You are a tutor for an Indian college student preparing for {profile.subject}.

LEARNING STYLE: {style_instructions.get(profile.style, style_instructions['example'])}

STUDENT LEVEL: {level_instructions.get(profile.level, level_instructions['beginner'])}

LANGUAGE: {language_instructions.get(profile.language, language_instructions['english'])}

CRITICAL RULES:
- Maximum 150 words total
- No filler phrases like "Let me explain", "As you can see", "In conclusion"
- End with ONE encouraging line (max 10 words) that's specific to their progress
- If the question is unclear, make your best guess and answer that
- Focus on UNDERSTANDING, not memorization

QUESTION: {question}

Answer now:"""

# Emergency fallback if Gemini fails during demo
FALLBACK_RESPONSES = {
    "variable": "A variable is like a labeled box where you store information. Just like you write 'Atta' on a container to remember what's inside, in programming you give names to values like x = 5. The box is named 'x' and it contains the number 5. You can change what's in the box anytime - that's why it's called a 'variable'.",
    
    "loop": "A for loop repeats a task multiple times automatically. Think of it like a vegetable vendor counting tomatoes - he picks one, counts it, picks another, counts it, and keeps going until all tomatoes are counted. Similarly, a for loop goes through a list and does something with each item, one by one.",
    
    "function": "A function is like a recipe. You give it ingredients (inputs), it follows steps (code), and gives you the dish (output). Once you write the recipe, you can use it whenever you want without writing all steps again. Just call the function name!",
}

def get_fallback_response(question: str, language: str) -> str:
    """Returns hardcoded response if API fails"""
    question_lower = question.lower()
    
    # Find matching fallback
    for key, response in FALLBACK_RESPONSES.items():
        if key in question_lower:
            if language == "hindi":
                # Basic Hindi versions - add these
                hindi_fallbacks = {
                    "variable": "Variable ek labelled box ki tarah hai jismein aap information store karte hain...",
                    # Add Hindi versions for demo
                }
                return hindi_fallbacks.get(key, response)
            return response
    
    return "I'm having trouble connecting right now. Please try asking in a different way or check your internet connection."
