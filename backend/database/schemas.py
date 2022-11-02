from typing import List

from fastapi import Form
from pydantic import BaseModel, EmailStr


class User(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str | None = None


class ShowUser(BaseModel):
    username: str
    email: EmailStr


class Hashes(BaseModel):
    md5: str
    sha1: str
    sha256: str


class Book(BaseModel):
    title: str
    course_code: str
    author: List[str] | str | None = None
    publisher: str | None = None
    isbn: List[str] | str | None = None
    doi: str | None = None
    # date_published: date | None = None
    description: str | None = None

    @classmethod
    def as_form(
        cls,
        title=Form(...),
        course_code=Form(...),
        author=Form(None),
        publisher=Form(None),
        isbn=Form(None),
        doi=Form(None),
        description=Form(None),
    ):
        return cls(
            title=title,
            course_code=course_code,
            author=author,
            publisher=publisher,
            isbn=isbn,
            doi=doi,
            description=description,
        )


class ShowBook(BaseModel):
    filename: str
    title: str
    course_code: str
    author: List[str] | str | None = None
    publisher: str | None = None
    isbn: List[str] | str | None = None
    doi: str | None = None
    description: str | None = None
    hashes: Hashes


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
