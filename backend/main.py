from fastapi import FastAPI

from .routers import users, auth

description = """
📚 E-book Collector by Team 6 of CPE41S1 🐙

#### Legend (enclosed in square bracket):
* 🔒 - Admin
* 🧑‍🏫 - User / Professor

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

## Library 📚
### Features:
* _To be implemented_ 🤷

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
    {"name": "users", "description": "Operations with users for admins."},
    {
        "name": "authentication",
        "description": "Authentication of users for login purposes.",
    },
]


app = FastAPI(
    title="< L I B R A R Y >",
    description=description,
    version="AdamantInkling 0.2",
    contact=contact,
    license_info=license_info,
    openapi_tags=tags_metadata,
)
app.include_router(users.router)
app.include_router(auth.router)


# Minimal application
@app.get("/", tags=["ROOT"])
async def index():
    return {
        "hello": "world",
    }
