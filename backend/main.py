from fastapi import FastAPI

from .routers import users

app = FastAPI()
app.include_router(users.router)


# Minimal application
@app.get('/', tags=['ROOT'])
async def index():
    return {
        'hello': 'world',
    }
