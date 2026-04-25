import os
from dotenv import load_dotenv
import motor.motor_asyncio
from bson import ObjectId
from datetime import datetime

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client.Udaan
users_collection = db.users

async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

async def get_user_by_id(user_id: str):
    return await users_collection.find_one({"_id": ObjectId(user_id)})

async def create_user(user_data: dict) -> str:
    document = {
        "name": user_data.get("name"),
        "email": user_data.get("email"),
        "password": user_data.get("password"),
        "profile": {
            "level": user_data.get("level"),
            "style": user_data.get("style"),
            "language": user_data.get("language"),
            "subject": user_data.get("subject"),
            "city": user_data.get("city"),
            "degree": user_data.get("degree"),
            "hiddenSkill": user_data.get("hiddenSkill"),
            "experience": user_data.get("experience")
        },
        "progress": 0,
        "sessions": [],
        "created_at": datetime.utcnow()
    }
    result = await users_collection.insert_one(document)
    return str(result.inserted_id)

async def update_user_progress(user_id: str, progress: int):
    await users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"progress": progress}}
    )
