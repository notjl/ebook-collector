import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pymongo import TEXT

from .handlers import user_handlers
from .routers import users, auth, library
from .database import db, schemas

from contextlib import suppress

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
* **Download Books**
* **Update Books** [🔒]
* **Delete Books** [🔒]
* **Approve Book** [🔒]

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

# To have smooth communication between React (frontend) and FastAPI (backend)
origins = [
    "https://localhost:3000",
    "http://localhost:3000",
    "https://127.0.0.1:3000",
    "http://127.0.0.1:3000",
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

    admin_data = {"username": "admin", "password": "somestrongadminpassword", "email": "admin@admin.com", "role": "admin"}
    admin = schemas.User(**admin_data)

    prof_data = {"username": "professor", "password": "professor", "email": "professor@professor.com", "role": "professor"}
    prof = schemas.User(**prof_data)
    with suppress(Exception):
        await user_handlers.create_user(admin, db.get_library_database()["users"])
        await user_handlers.create_user(prof, db.get_library_database()["users"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.get("/", tags=["ROOT"])
async def index():
    # Minimal application
    return {
        "ping": "pong",
    }
