from fastapi import FastAPI
from pymongo import TEXT

from .routers import users, auth, library
from .database import db

description = """
📚 E-book Collector by Team 6 of CPE41S1 🐙

#### Legend (enclosed in square bracket):
* 🔒 - Admin
* 🧑‍🏫 - User / Professor

## Library 📚
### Features:
* **Upload Books** [🧑‍🏫]
* **Search using Course Code / Book Title**
* **Read Book/Books**
* **Preview Books**
* **Download Books** [🧑‍🏫]
* **Update Books** [🔒]
* **Delete Books** [🔒]

## Users 🧑‍💻
### Features:
* **Create Users** [🔒]
* **Read User/Users** [🔒]
* **Update User** [🔒]
* **Delete User** [🔒]

## Authentication 🔐
### Features:
* **JWT Token** 🔑 - _defaults_ to 30 minutes
* **Argon2 Password Verification** 🔓

"""

contact = {
    "name": "notjl",
    "url": "https://github.com/notjl",
    "email": "qagpcabezas@tip.edu.ph",
}

license_info = {
    "name": "Expat License (MIT)",
    "url": "https://mit-license.org/",
}

tags_metadata = [
    {
        "name": "library",
        "description": "Library operations for users and admins",
    },
    {"name": "users", "description": "Operations with users for admins."},
    {
        "name": "authentication",
        "description": "Authentication of users for login purposes.",
    },
]


app = FastAPI(
    title="< L I B R A R Y >",
    description=description,
    version="AdamantInkling 0.7",
    contact=contact,
    license_info=license_info,
    openapi_tags=tags_metadata,
)
app.include_router(library.router)
app.include_router(users.router)
app.include_router(auth.router)


@app.on_event("startup")
async def startup_event():
    # Temp fix for index creation
    await db.get_library_database()["ebooks.files"].create_index(
        [("title", TEXT), ("course_code", TEXT)],
        name="book_title_course_code_search",
    )


@app.get("/", tags=["ROOT"])
async def index():
    return {
        "hello": "world",
    }
