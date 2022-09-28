from pydantic import BaseModel, EmailStr


# User schema for basic user
class User(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str | None = None


class ShowUser(BaseModel):
    username: str
    email: EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
