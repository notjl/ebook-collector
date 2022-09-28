from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List

from ..utils.hashing import argon2h
from ..utils.checks import check_if_exists
from ..database import schemas


# Take User schema and hash the password using argon2id
async def create_user(
    user: schemas.User, collection: AsyncIOMotorCollection
) -> schemas.User:
    tmp = user.dict()

    if await check_if_exists(tmp["username"], collection, "username"):
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail=f'User [{tmp["username"]}] exists',
        )

    tmp["password"] = argon2h(tmp["password"])

    result = await collection.insert_one(tmp)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Something went wrong / Bad request",
        )

    return tmp


async def get_user(
    username: str, collection: AsyncIOMotorCollection
) -> schemas.User:
    document: schemas.User = await collection.find_one(
        {"$or": [{"username": username}, {"email": username}]}
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User [{username}] does not exist!",
        )
    return document


async def get_all_user(
    collection: AsyncIOMotorCollection,
) -> List[schemas.User]:
    return [schemas.User(**document) async for document in collection.find({})]


async def update_user(
    username: str, changes: schemas.User, collection: AsyncIOMotorCollection
) -> schemas.User:
    tmp = changes.dict()

    if not await check_if_exists(username, collection, "username"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User [{username}] does not exist!",
        )

    tmp["password"] = argon2h(tmp["password"])

    await collection.update_one(
        {
            "username": username,
        },
        {
            "$set": tmp,
        },
    )

    document: schemas.User = await collection.find_one(
        {"username": tmp["username"]}
    )
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User [{username}] does not exist!",
        )
    return document


async def delete_user(
    username: str, collection: AsyncIOMotorCollection
) -> List[schemas.User]:
    await collection.delete_one({"username": username})
    return [schemas.User(**document) async for document in collection.find({})]
