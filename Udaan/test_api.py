import httpx
import asyncio
import json
import sys
import io

# Fix encoding for Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_URL = "http://localhost:8000"
# Use a unique email so register doesn't conflict with previous run
TEST_EMAIL = "test_fullrun2@example.com"
TEST_PASSWORD = "testpassword123"

async def test_all():
    async with httpx.AsyncClient(timeout=60.0) as client:

        print("=" * 60)
        print("1. GET /  (Health check)")
        print("=" * 60)
        resp = await client.get(f"{BASE_URL}/")
        print(f"   Status : {resp.status_code}")
        print(f"   Body   : {resp.json()}")
        assert resp.status_code == 200, "FAIL: Health check"
        print("   PASS")

        print()
        print("=" * 60)
        print("2. POST /auth/register")
        print("=" * 60)
        reg_data = {
            "name": "Test User Two",
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD,
            "level": "beginner",
            "style": "definition",
            "language": "english",
            "subject": "Python",
            "city": "Delhi"
        }
        resp = await client.post(f"{BASE_URL}/auth/register", json=reg_data)
        print(f"   Status : {resp.status_code}")
        print(f"   Body   : {resp.json()}")

        token = None
        if resp.status_code == 200:
            token = resp.json().get("access_token")
            print("   PASS (new user created)")
        elif resp.status_code == 400:
            print("   User already exists — will login instead")
        else:
            print(f"   UNEXPECTED: {resp.text}")
            return

        print()
        print("=" * 60)
        print("3. POST /auth/login")
        print("=" * 60)
        login_data = {"email": TEST_EMAIL, "password": TEST_PASSWORD}
        resp = await client.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"   Status : {resp.status_code}")
        print(f"   Body   : {resp.json()}")
        if resp.status_code == 200:
            token = resp.json().get("access_token")
            print("   PASS")
        else:
            print("   FAIL: Could not login")
            return

        headers = {"Authorization": f"Bearer {token}"}

        print()
        print("=" * 60)
        print("4. GET /auth/me")
        print("=" * 60)
        resp = await client.get(f"{BASE_URL}/auth/me", headers=headers)
        print(f"   Status : {resp.status_code}")
        print(f"   Body   : {json.dumps(resp.json(), indent=4, ensure_ascii=False)}")
        assert resp.status_code == 200, "FAIL: /auth/me"
        print("   PASS")

        print()
        print("=" * 60)
        print("5. PATCH /auth/progress")
        print("=" * 60)
        resp = await client.patch(f"{BASE_URL}/auth/progress", json={"progress": 42}, headers=headers)
        print(f"   Status : {resp.status_code}")
        print(f"   Body   : {resp.json()}")
        assert resp.status_code == 200, "FAIL: /auth/progress"
        print("   PASS")

        print()
        print("=" * 60)
        print("6. POST /explain")
        print("=" * 60)
        resp = await client.post(f"{BASE_URL}/explain", json={"question": "What is a variable in Python?"}, headers=headers)
        print(f"   Status : {resp.status_code}")
        body = resp.json()
        print(f"   mode   : {body.get('mode_used')}")
        expl = body.get('explanation', '')
        print(f"   expl   : {expl[:120]}...")
        assert resp.status_code == 200, f"FAIL: /explain — {body}"
        print("   PASS")

        print()
        print("=" * 60)
        print("7. POST /quiz")
        print("=" * 60)
        resp = await client.post(f"{BASE_URL}/quiz", json={"topic": "Python Loops", "level": "beginner", "language": "english"}, headers=headers)
        print(f"   Status : {resp.status_code}")
        body = resp.json()
        print(f"   question: {body.get('question', '')[:80]}")
        print(f"   options : {body.get('options')}")
        assert resp.status_code == 200, f"FAIL: /quiz — {body}"
        print("   PASS")

        print()
        print("=" * 60)
        print("8. POST /reexplain")
        print("=" * 60)
        resp = await client.post(f"{BASE_URL}/reexplain", json={"topic": "for loop", "previous_mode": "definition"}, headers=headers)
        print(f"   Status : {resp.status_code}")
        body = resp.json()
        print(f"   new_mode: {body.get('new_mode')}")
        expl = body.get('explanation', '')
        print(f"   expl    : {expl[:120]}...")
        assert resp.status_code == 200, f"FAIL: /reexplain — {body}"
        print("   PASS")

        print()
        print("=" * 60)
        print("9. GET /opportunities")
        print("=" * 60)
        resp = await client.get(f"{BASE_URL}/opportunities", headers=headers)
        print(f"   Status : {resp.status_code}")
        body = resp.json()
        print(f"   events : {len(body.get('events', []))} returned")
        if body.get("events"):
            print(f"   first  : {body['events'][0].get('title', '')}")
        bridge = body.get('bridge', '')
        print(f"   bridge : {bridge[:100]}...")
        assert resp.status_code == 200, f"FAIL: /opportunities — {body}"
        print("   PASS")

        print()
        print("=" * 60)
        print("ALL 9 TESTS PASSED")
        print("=" * 60)

if __name__ == "__main__":
    asyncio.run(test_all())
