import asyncio
from database import client

async def test_connection():
    try:
        await client.admin.command('ping')
        print("Connected successfully!")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
