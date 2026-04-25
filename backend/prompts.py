def get_quiz_prompt(topic: str, level: str, language: str) -> str:
    return f"""You are an expert tutor. Generate exactly 1 multiple-choice question on the topic: "{topic}".

Difficulty level: {level}
Language: {language}

Respond ONLY with a valid JSON object in this exact format (no markdown, no code blocks):
{{
  "question": "Your question here",
  "options": [
    {{"id": "a", "text": "Option A"}},
    {{"id": "b", "text": "Option B"}},
    {{"id": "c", "text": "Option C"}},
    {{"id": "d", "text": "Option D"}}
  ],
  "correct_answer": "a",
  "explanation": "Brief explanation of why this is correct"
}}

Rules:
- Exactly 4 options with ids a, b, c, d
- correct_answer must be one of: a, b, c, d
- If language is "hindi", write question and options in Hindi
- If language is "hinglish", use a mix of Hindi and English
- If language is "english", write everything in English
- Return ONLY the JSON object, nothing else
"""


def get_reexplain_prompt(topic: str, profile: dict, previous_mode: str) -> str:
    return f"""You are a friendly tutor helping a student who just got a quiz question wrong.

Topic: "{topic}"
Student level: {profile.get("level", "beginner")}
Preferred language: {profile.get("language", "english")}
Learning style: {profile.get("style", "visual")}
Previous explanation mode used: {previous_mode}

Your task:
- Re-explain the topic using a DIFFERENT analogy or approach than "{previous_mode}"
- Start your response with: "Let me try explaining this differently..."
- Keep it under 120 words
- Use the student's preferred language ({profile.get("language", "english")})
- Match the student's level ({profile.get("level", "beginner")})
- Make it engaging and easy to understand

Respond ONLY with a JSON object in this exact format (no markdown, no code blocks):
{{
  "explanation": "Your re-explanation here starting with Let me try explaining this differently...",
  "new_mode": "the analogy/mode you used (e.g., real-life, story, visual, sports, cooking)"
}}
"""
