import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from .routers import users

description = """
E-book Collector by Team 6 of CPE41S1

## Users
### Features:
* **Create Users**
* **Read User/Users**
* **Update User**
* **Delete User**

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

tags_metadata = [{"name": "users", "description": "Operations with users."}]

# To have smooth communication between React (frontend) and FastAPI (backend)
origins = ["https://localhost:3000", "http://localhost:3000", "https://127.0.0.1:3000", "http://127.0.0.1:3000"]

app = FastAPI(
    title="< L I B R A R Y >",
    description=description,
    version="AdamantInkling 0.1",
    contact=contact,
    license_info=license_info,
    openapi_tags=tags_metadata,
)
app.include_router(users.router)


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
