from typing import List

from fastapi import APIRouter, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorCollection


from ..utils import checks
from ..database import schemas, db
from ..handlers import lib_handlers as handler

professor_access = checks.RoleChecker(["professor"])

router = APIRouter(
    prefix="/library",
    tags=["library"],
)


@router.post(
    "/upload",
    response_model=schemas.ShowBook,
    summary="Upload a file to the gridfs with the neccessary details",
)
async def upload(
    book: schemas.Book = Depends(schemas.Book.as_form),
    ebook: UploadFile = File(...),
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
    access = Depends(professor_access)
) -> schemas.ShowBook:
    return await handler.upload_ebook(
        book, ebook, collection, db.get_ebooks_gridfs()
    )


@router.get(
    "/library/books",
    response_model=List[schemas.ShowBook],
    summary="Get all books in the gridfs",
)
async def get_all(
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
) -> List[schemas.ShowBook]:
    return await handler.get_all_book(collection)


@router.delete(
    "/{book_title}/delete",
    response_model=List[schemas.ShowBook],
    summary="Delet a book in the gridfs",
)
async def delete(
    book_title: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
) -> List[schemas.ShowBook]:
    return await handler.delete_book(
        book_title, collection, db.get_ebooks_gridfs()
    )
