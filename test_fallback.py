from prompts import get_fallback_response

print("Fallback Test 1 (English, Variable):")
print(get_fallback_response("What is a variable?", "english"))
print("\n" + "="*50 + "\n")

print("Fallback Test 2 (Hindi, Variable):")
print(get_fallback_response("Variable kya hai?", "hindi"))
print("\n" + "="*50 + "\n")

print("Fallback Test 3 (Unknown concept):")
print(get_fallback_response("What is quantum computing?", "english"))
