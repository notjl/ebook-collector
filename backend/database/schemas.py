from pydantic import BaseModel, EmailStr


# User schema for basic user
class User(BaseModel):
    username: str
    email: EmailStr
    password: str


class ShowUser(BaseModel):
    pass
