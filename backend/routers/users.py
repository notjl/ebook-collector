from fastapi import APIRouter
from typing import List

from ..database import schemas
from ..handlers import user_handlers

router = APIRouter(prefix="/user", tags=["users"])


@router.post("/create", response_model=schemas.User, summary="Create a user")
async def create(user: schemas.User) -> schemas.User:
    """
    Create a user with the required credentials

    Parameters:
    * **username** (str): a unique identifier set by the user
    * **email** (str): a unique identifier set by the user
    * **password** (str): a string to validate user

    Returns:
    * **schemas._User_**: JSON of the user details
    """
    return await user_handlers.create_user(user.dict())


@router.get("/all", response_model=List[schemas.ShowUser], summary="Get all users")
async def get_all() -> List[schemas.ShowUser]:
    """
    Get all users with their password filtered out

    Returns:
    * **schemas._ShowUser_**: List of Users
    """
    return await user_handlers.get_all_user()


@router.get(
    "/{username}", response_model=schemas.ShowUser, summary="Get a specific user"
)
async def get(username: str) -> schemas.ShowUser:
    """
    Get a user with their password filtered out

    Path Paremeters:
    * **username** (str): Used for querying the database

    Returns:
    * **schemas._ShowUser_**: JSON of the user details
    """
    return await user_handlers.get_user(username)


@router.put("/{username}/update", response_model=schemas.User, summary="Update a user")
async def update(username: str, changes: schemas.User) -> schemas.User:
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
    return await user_handlers.update_user(username, changes.dict())


@router.delete("/{username}/delete", summary="Delete a user")
async def delete(username: str) -> schemas.User:
    """
    Delete a specfic user

    Path Parameters:
    * **username** (str): Use for querying the database

    Returns:
    * pass
    """
    return await user_handlers.delete_user(username)
