from datetime import datetime, timedelta
from os import getenv

from fastapi import HTTPException
from jose import JWTError, jwt
from motor.motor_asyncio import AsyncIOMotorCollection

from ..database import schemas

SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")


def create_access_token(
    data: dict, expires_delta: timedelta | None = None
) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_token(
    token: str,
    credentials_exception: HTTPException,
    collection: AsyncIOMotorCollection,
) -> schemas.User:
    try:
        payload = jwt.decode(token, SECRET_KEY)
        username: str = payload.get("sub")
        if not username:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user: schemas.User = await collection.find_one(
        {
            "$or": [
                {"username": token_data.username},
                {"email": token_data.username},
            ]
        }
    )

    if not user:
        raise credentials_exception
    return user
