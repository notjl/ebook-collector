from fastapi import HTTPException, status
from typing import List

from ..utils.hashing import argon2h, verify
from ..utils.checks import check_if_exists
from ..database import schemas, db

collection = db.collection_users


# Take User schema and hash the password using argon2id
async def create_user(user: schemas.User) -> schemas.User:
    if await check_if_exists(user, collection, "username"):
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail=f'User [{user["username"]}] exists',
        )

    user["password"] = argon2h(user["password"])

    result = await collection.insert_one(user)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Something went wrong / Bad request",
        )

    return user


async def get_user(username: str) -> schemas.User:
    document: schemas.User = await collection.find_one({"username": username})
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User [{username}] does not exist!",
        )
    return document


async def get_all_user() -> List[schemas.User]:
    return [schemas.User(**document) async for document in collection.find({})]


async def update_user(username: str) -> schemas.User:
    pass


async def delete_user(username: str) -> schemas.User:
    pass
