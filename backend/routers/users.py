from fastapi import APIRouter

from ..database import schemas
from ..handlers import user_handlers

router = APIRouter(
    prefix='/user',
    tags=['user']
)


# User creation route and return User schema as response
@router.post('/', response_model=schemas.User)
async def create(user: schemas.User):
    return await user_handlers.create_user(user.dict())


@router.get('/{username}')
async def get(username: str):
    pass
