from fastapi import APIRouter

from ..database import schemas
from ..handlers import user_handlers

router = APIRouter(prefix="/user", tags=["user"])


# User creation route and return User schema as response
@router.post("/create", response_model=schemas.User)
async def create(user: schemas.User):
    return await user_handlers.create_user(user.dict())


# User get route and return ShowUser schema as response
@router.get("/{username}", response_model=schemas.ShowUser)
async def get(username: str):
    return await user_handlers.get_user(username)


# All User get route and return ShowUser schema as response
@router.get("/all")
async def get_all(username: str):
    pass
