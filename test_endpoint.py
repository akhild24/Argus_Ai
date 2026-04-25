import requests
import json
import sys

# Ensure UTF-8 output for Windows console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://localhost:8000"

def test_explain_endpoint():
    """Test all combinations"""
    
    test_cases = [
        {
            "name": "Beginner + Example + Hindi",
            "data": {
                "question": "What is a variable?",
                "profile": {
                    "level": "beginner",
                    "style": "example",
                    "language": "hindi",
                    "subject": "python"
                }
            }
        },
        {
            "name": "Advanced + Definition + English",
            "data": {
                "question": "Explain recursion",
                "profile": {
                    "level": "advanced",
                    "style": "definition",
                    "language": "english",
                    "subject": "python"
                }
            }
        },
        {
            "name": "Intermediate + Hands-on + Hinglish",
            "data": {
                "question": "How do lists work?",
                "profile": {
                    "level": "intermediate",
                    "style": "hands_on",
                    "language": "hinglish",
                    "subject": "python"
                }
            }
        }
    ]
    
    for test in test_cases:
        print(f"\n{'='*60}")
        print(f"TEST: {test['name']}")
        print(f"{'='*60}")
        
        response = requests.post(
            f"{BASE_URL}/explain",
            json=test['data']
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"SUCCESS")
            print(f"Mode Used: {result['mode_used']}")
            print(f"Explanation:\n{result['explanation']}")
        else:
            print(f"FAILED: {response.status_code}")
            print(response.text)

if __name__ == "__main__":
    test_explain_endpoint()
