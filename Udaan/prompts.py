def get_explain_prompt(question: str, profile) -> str:
    styles = {
        "example": "Give a real Indian daily-life example first, then explain.",
        "definition": "Start with one clear definition, then 3 short bullets.",
        "hands_on": "Give a tiny coding task first, then explain.",
    }

    levels = {
        "beginner": "Use zero jargon. Explain like the student is 16.",
        "intermediate": "Use normal terms but keep it simple.",
        "advanced": "Be more technical and direct.",
    }

    languages = {
        "english": "Respond in simple English.",
        "hindi": "Respond fully in Hindi using Devanagari script. Every single word must be in Hindi.",
        "hinglish": "Respond in natural Hinglish.",
    }

    style = getattr(profile, "style", "definition")
    level = getattr(profile, "level", "intermediate")
    language = getattr(profile, "language", "English")

    style_rule = styles.get(style, styles["definition"])
    level_rule = levels.get(level, levels["intermediate"])
    language_rule = languages.get(language.lower() if language else "english", languages["english"])

    return f"""Please answer the following question:
{question}

Rules:
- {style_rule}
- {level_rule}
- {language_rule}
- max 150 words, no filler phrases, only answer what is asked, do not bring up related topics, end with one encouraging line.
"""


def get_quiz_prompt(topic: str, level: str, language: str) -> str:
    lang_lower = language.lower() if language else "english"
    if lang_lower == "hindi":
        lang_instruction = "write in Hindi Devanagari"
    elif lang_lower == "hinglish":
        lang_instruction = "write in Hinglish"
    else:
        lang_instruction = "write in English"

    return f"""Create exactly 1 MCQ on the topic "{topic}" at the "{level}" level.

Language requirement: {lang_instruction}

Return ONLY a raw JSON object - no markdown, no backticks, no text before or after.
JSON shape must be exactly:
{{ "question": "...", "options": [{{"id": "a", "text": "..."}}, {{"id": "b", "text": "..."}}, {{"id": "c", "text": "..."}}, {{"id": "d", "text": "..."}}], "correct_answer": "a", "explanation": "..." }}"""


def get_reexplain_prompt(topic: str, profile, previous_mode: str) -> str:
    alternative_styles = {
        "example": "Use a technical definition with step-by-step bullets, completely different from an example approach.",
        "definition": "Use a real-world, relatable scenario or analogy - completely different from a definition.",
        "hands_on": "Use a practical step-by-step walkthrough or simplified definition - not a coding task.",
    }
    new_approach = alternative_styles.get(
        previous_mode,
        "Use a completely different angle with a new example.",
    )
    level = getattr(profile, "level", "intermediate")
    language = getattr(profile, "language", "English")

    return f"""IMPORTANT: The user did not understand the previous "{previous_mode}" explanation of "{topic}".

Provide a COMPLETELY DIFFERENT explanation. Follow this approach:
{new_approach}

Requirements:
- For "{level}" student level
- Respond in "{language}"
- Maximum 150 words
- Use new examples, not the previous explanation
- Make it engaging and clear"""


def get_opportunities_prompt(city: str, subject: str, degree: str, level: str) -> str:
    return f"""Generate exactly 5 hyper-local, FREE, and real upcoming events or opportunities (workshops, seminars, networking, or job fairs) in "{city}" relevant to a student of "{subject}" with a "{degree}" degree at the "{level}" level.

Also write a "bridge" message connecting their learning to a career outcome, such as potential job roles, companies, or salary ranges.

Return ONLY a raw JSON object - no markdown, no backticks, no text before or after.
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
