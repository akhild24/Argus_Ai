def get_explain_prompt(question: str, profile) -> str:
    styles = {
        "example": "Give a real Indian daily-life example first, then explain.",
        "definition": "Start with one clear definition, then 3 short bullets.",
        "hands_on": "Give a tiny coding task first, then explain."
    }
    
    levels = {
        "beginner": "Use zero jargon. Explain like the student is 16.",
        "intermediate": "Use normal terms but keep it simple.",
        "advanced": "Be more technical and direct."
    }
    
    languages = {
        "english": "Respond in simple English.",
        "hindi": "Respond fully in Hindi using Devanagari script. Every single word must be in Hindi.",
        "hinglish": "Respond in natural Hinglish."
    }
    
    style_rule = styles.get(profile.style, styles["definition"])
    level_rule = levels.get(profile.level, levels["intermediate"])
    language_rule = languages.get(profile.language, languages["english"])
    
    return f"""Please answer the following question:
{question}

Rules:
- {style_rule}
- {level_rule}
- {language_rule}
- max 150 words, no filler phrases, only answer what is asked, do not bring up related topics, end with one encouraging line.
"""

def get_quiz_prompt(topic: str, level: str, language: str) -> str:
    if language == "hindi":
        lang_instruction = "write in Hindi Devanagari"
    elif language == "hinglish":
        lang_instruction = "write in Hinglish"
    else:
        lang_instruction = "write in English"
        
    return f"""Create exactly 1 MCQ on the topic "{topic}" at the "{level}" level.

Language requirement: {lang_instruction}

Return ONLY a raw JSON object — no markdown, no backticks, no text before or after.
JSON shape must be exactly:
{{ "question": "...", "options": [{{"id": "a", "text": "..."}}, {{"id": "b", "text": "..."}}, {{"id": "c", "text": "..."}}, {{"id": "d", "text": "..."}}], "correct_answer": "a", "explanation": "..." }}"""

def get_reexplain_prompt(topic: str, profile, previous_mode: str) -> str:
    return f"""The user didn't quite understand the previous explanation about '{topic}' which was in '{previous_mode}' style.
Please provide a completely new explanation. Do not use the same approach.
Style requirement: Explain like you are addressing a '{profile.level}' student.
Language requirement: Respond in '{profile.language}'.
Keep it simple, max 150 words."""

def get_opportunities_prompt(city: str, subject: str, degree: str, level: str) -> str:
    return f"""Generate exactly 5 hyper-local, FREE, and real upcoming events or opportunities (workshops, seminars, networking, or job fairs) in "{city}" relevant to a student of "{subject}" with a "{degree}" degree at the "{level}" level.

    Also, write a "bridge" message connecting their learning to a career outcome (e.g. potential job roles, companies, or salary ranges).

    Return ONLY a raw JSON object — no markdown, no backticks, no text before or after.
    JSON shape must be exactly:
    {{
      "events": [
        {{ "title": "...", "org": "...", "date": "...", "city": "...", "category": ["..."] }},
        {{ "title": "...", "org": "...", "date": "...", "city": "...", "category": ["..."] }},
        {{ "title": "...", "org": "...", "date": "...", "city": "...", "category": ["..."] }},
        {{ "title": "...", "org": "...", "date": "...", "city": "...", "category": ["..."] }},
        {{ "title": "...", "org": "...", "date": "...", "city": "...", "category": ["..."] }}
      ],
      "bridge": "..."
    }}"""
