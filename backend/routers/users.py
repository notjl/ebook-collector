from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List

from ..database import schemas, db
from ..handlers import user_handlers as handler
from ..utils import checks

super_access = checks.RoleChecker(["admin"])

router = APIRouter(
    prefix="/user", tags=["users"], dependencies=[Depends(super_access)]
)


@router.post("/create", response_model=schemas.User, summary="Create a user")
async def create(
    user: schemas.User,
    collection: AsyncIOMotorCollection = Depends(db.get_user_collection),
) -> schemas.User:
    """
    Create a user with the required credentials

    Parameters:
    * **username** (str): a unique identifier set by the user
    * **email** (str): a unique identifier set by the user
    * **password** (str): a string to validate user

    Returns:
    * **schemas._User_**: JSON of the user details
    """
    return await handler.create_user(user, collection)


@router.get("/all", response_model=List[schemas.ShowUser], summary="Get all users")
async def get_all(
    collection: AsyncIOMotorCollection = Depends(db.get_user_collection),
) -> List[schemas.User]:
    """
    Get all users with their password filtered out

    Returns:
    * List[**schemas._ShowUser_**]: List of Users
    """
    return await handler.get_all_user(collection)


@router.get(
    "/{username}",
    response_model=schemas.ShowUser,
    summary="Get a specific user",
)
async def get(
    username: str,
    collection: AsyncIOMotorCollection = Depends(db.get_user_collection),
) -> schemas.User:
    """
    Get a user with their password filtered out

    Path Paremeters:
    * **username** (str): Used for querying the database

    Returns:
    * **schemas._ShowUser_**: JSON of the user details
    """
    return await handler.get_user(username, collection)


@router.put("/{username}/update", response_model=schemas.User, summary="Update a user")
async def update(
    username: str,
    changes: schemas.User,
    collection: AsyncIOMotorCollection = Depends(db.get_user_collection),
) -> schemas.User:
    """
    Update a specific user's information

    Path Parameters:
    * **username** (str): Use for querying the database

    Parameters:
    * **username** (str): a unique identifier set by the user
    * **email** (str): a unique identifier set by the user
    * **password** (str): a string to validate user

    Returns:
    * **schemas._User_**: JSON of the user details
    """
    return await handler.update_user(username, changes, collection)


@router.delete("/{username}/delete", summary="Delete a user")
async def delete(
    username: str,
    collection: AsyncIOMotorCollection = Depends(db.get_user_collection),
) -> List[schemas.User]:
    """
    Delete a specfic user

    Path Parameters:
    * **username** (str): Use for querying the database

    Returns:
    * List[**schemas._ShowUser_**]: List of Users
    """
    return await handler.delete_user(username, collection)
