from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorCollection

from ..database import schemas, db
from ..handlers import auth_handlers

router = APIRouter(tags=["authentication"])


@router.post("/login", response_model=schemas.Token)
async def login(
    request: OAuth2PasswordRequestForm = Depends(),
    collection: AsyncIOMotorCollection = Depends(db.get_user_collection),
) -> schemas.Token:
    return await auth_handlers.authenticate_user(request, collection)
