from contextlib import suppress

from fastapi import Depends, HTTPException, status

from ..database import schemas
from ..utils import oauth2


class RoleChecker:
    # Code fetched from Codementor@mandarvaze in their blog about "How to im-
    # plement Role based Access Control with FastAPI"
    def __init__(self, allowed_roles: list):
        self.allowed_roles = allowed_roles

    def __call__(self, user: schemas.User = Depends(oauth2.get_current_user)):
        if user["role"] not in self.allowed_roles:
            print_string = "User [{}] with {} is not in {}"
            print(
                print_string.format(
                    user["username"], user["role"], self.allowed_roles
                )
            )
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted",
            )


async def check_if_exists(document, collection, key) -> bool:
    # Wrapper for checking a document exists in the collection
    temp_data = await collection.find_one({key: document[key]})
    with suppress(Exception):
        if document[key] == temp_data[key]:
            return True

    return False
