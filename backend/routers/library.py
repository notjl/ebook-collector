from fastapi import APIRouter, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorCollection


from ..database import schemas, db
from ..handlers import lib_handlers

router = APIRouter(
    prefix="/library",
    tags=["library"],
)


@router.post(
    "/upload",
    response_model=schemas.ShowBook,
    summary="Upload a file with the neccessary details",
)
async def upload(
    book: schemas.Book = Depends(schemas.Book.as_form),
    ebook: UploadFile = File(...),
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
):
    return await lib_handlers.upload_ebook(
        book, ebook, collection, db.get_ebooks_gridfs()
    )
