import motor.motor_asyncio

from os import getenv


def get_user_collection():
    # Initiate local MongoDB client
    # Create a database named LibraryDB
    # Create a collection inside LibraryDB named users
    client = motor.motor_asyncio.AsyncIOMotorClient(getenv("DB_URI"))
    db = client["LibraryDB"]
    yield db.users
