from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket

from os import getenv


def get_library_database():
    return AsyncIOMotorClient(getenv("MONGO_URL"))["LibraryDB"]


def get_user_collection():
    db = get_library_database()
    yield db["users"]


def get_ebooks_collection():
    db = get_library_database()
    yield db["ebooks.files"]


def get_ebooks_gridfs():
    db = get_library_database()
    return AsyncIOMotorGridFSBucket(db, "ebooks")


def get_covers_gridfs():
    db = get_library_database()
    return AsyncIOMotorGridFSBucket(db, "covers")
