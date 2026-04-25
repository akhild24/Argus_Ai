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

def _to_object_id(user_id: str):
    if not user_id or not ObjectId.is_valid(user_id):
        return None
    return ObjectId(user_id)

async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

async def get_user_by_id(user_id: str):
    object_id = _to_object_id(user_id)
    if object_id is None:
        return None
    return await users_collection.find_one({"_id": object_id})

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
    object_id = _to_object_id(user_id)
    if object_id is None:
        return False
    await users_collection.update_one(
        {"_id": object_id},
        {"$set": {"progress": progress}}
    )
    return True
