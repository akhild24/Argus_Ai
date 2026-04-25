import requests
import json
import sys

# Ensure UTF-8 output for Windows console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://localhost:8000"

def test_hindi_questions():
    hindi_tests = [
        "for loop kya hota hai?",
        "variable aur constant mein kya fark hai?",
        "function kaise banate hain?",
        "list aur tuple mein difference batao",
    ]
    
    for question in hindi_tests:
        print(f"\n{'='*60}")
        print(f"QUESTION: {question}")
        print(f"{'='*60}")
        
        data = {
            "question": question,
            "profile": {
                "level": "beginner",
                "style": "example",
                "language": "hindi",
                "subject": "python"
            }
        }
        
        response = requests.post(f"{BASE_URL}/explain", json=data)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ SUCCESS")
            print(f"Explanation:\n{result['explanation']}\n")
            print("-" * 30)
            print("Verification Checklist:")
            print("[ ] Response is in Devanagari")
            print("[ ] Technical terms are in English (for loop, variable, etc.)")
            print("[ ] Explanations are in conversational Hindi")
            print("[ ] No awkward translations")
        else:
            print(f"❌ FAILED: {response.status_code}")
            print(response.text)

if __name__ == "__main__":
    test_hindi_questions()
