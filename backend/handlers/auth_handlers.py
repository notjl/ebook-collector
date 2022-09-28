from datetime import timedelta
from os import getenv

from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorCollection

from ..database import schemas
from ..utils import hashing, token


async def authenticate_user(
    request: OAuth2PasswordRequestForm, collection: AsyncIOMotorCollection
) -> schemas.Token:
    user: schemas.User = await collection.find_one(
        {"$or": [{"username": request.username}, {"email": request.username}]}
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User [{request.username}] does not exist!",
        )
    if not hashing.verify(request.password, user["password"]):
        print("wrong password")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Password incorrect"
        )

    access_token_expires = timedelta(
        minutes=int(getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    )
    access_token = token.create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires,
    )

    return {"access_token": access_token, "token_type": "bearer"}
