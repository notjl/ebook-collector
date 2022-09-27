from fastapi import FastAPI

from .routers import users

description = """
E-book Collector by Team 6 of CPE41S1

## Users
### Features:
* **Create Users**
* **Read User/Users**
* **Update User** (_not implemented_)
* **Delete User** (_not implemented_)

## Library
### Features:
* _To be implemented_
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
        "name": "users",
        "description": "Operations with users."
    }
]


app = FastAPI(
    title="< L I B R A R Y >",
    description=description,
    version="AdamantInkling 0.1",
    contact=contact,
    license_info=license_info,
    openapi_tags=tags_metadata,
)
app.include_router(users.router)


# Minimal application
@app.get("/", tags=["ROOT"])
async def index():
    return {
        "hello": "world",
    }
