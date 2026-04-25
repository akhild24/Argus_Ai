"""
gemini_client.py — Google Gemini 2.5 Flash Client
Team Argus | UDB-S7BT
"""

import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

_client = None


def _get_client():
    global _client
    if _client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise EnvironmentError(
                "GEMINI_API_KEY not set. Please add it to your .env file."
            )
        _client = genai.Client(api_key=api_key)
    return _client


async def ask(prompt: str) -> str:
    """Send a prompt to Gemini and return the response text."""
    client = _get_client()
    # Note: genai's generate_content is synchronous by default unless using async client.
    # To keep it simple, we wrap it here or use the sync version in an async def.
    # It will block the thread slightly but is fine for this use case.
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text.strip()
