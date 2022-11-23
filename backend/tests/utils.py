from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.testclient import TestClient

from os import getenv


def get_library_database():
    return AsyncIOMotorClient(getenv("DB_URI"))["DummyDB"]


def override_user_collection():
    db = get_library_database()
    yield db["users"]
