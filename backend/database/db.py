import motor.motor_asyncio

from os import getenv

# Initiate local MongoDB client
# Create a database named Users
# Create a collection inside Users named users
client = motor.motor_asyncio.AsyncIOMotorClient(getenv("DB_URI"))
user_db = client.Users
collection_users = user_db.users
