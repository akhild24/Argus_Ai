from prompts import get_explain_prompt
from models import Profile

# Test 1: Beginner + Example + Hindi
profile1 = Profile(level="beginner", style="example", language="hindi", subject="python")
print("TEST 1:\n", get_explain_prompt("What is a variable?", profile1))
print("\n" + "="*50 + "\n")

# Test 2: Advanced + Definition + English
profile2 = Profile(level="advanced", style="definition", language="english", subject="data_science")
print("TEST 2:\n", get_explain_prompt("Explain gradient descent", profile2))
