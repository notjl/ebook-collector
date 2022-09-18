import motor.motor_asyncio

# Initiate local MongoDB client
# Create a database named Users
# Create a collection inside Users named users
client = motor.motor_asyncio.AsyncIOMotorClient('localhost', 27017)
user_db = client.Users
collection_users = user_db.users
