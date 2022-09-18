from fastapi import HTTPException, status

from ..utils.hashing import argon2h, verify
from ..database import schemas, db

collection = db.collection_users


# Take User schema and hash the password using argon2id
async def create_user(user: schemas.User) -> schemas.User:
    document = user
    document['password'] = argon2h(document['password'])
    
    result = await collection.insert_one(user)

    if not result:
        HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Something went wrong / Bad request'
        )

    return user
