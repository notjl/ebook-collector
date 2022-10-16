from typing import List

from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile
from motor.motor_asyncio import AsyncIOMotorCollection

from ..database import db, schemas
from ..handlers import lib_handlers as handler
from ..utils import checks

professor_access = checks.RoleChecker(["professor"])
super_access = checks.RoleChecker(["admin"])

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
    access=Depends(professor_access),
) -> schemas.ShowBook:
    """
    Upload a book / ebook

    Allowed Roles:
    * **professor**

    Parameters:
    * **ebook** (file): ebook file (pdf, epub, etc.)
    * **title** (str): book title
    * **course_code** (str): appropriate course code
    * **description** _Optional_ (str): description of the book

    Returns:
    * **schemas._Book_**: JSON of the book details
    """
    return await handler.upload_ebook(
        book, ebook, collection, db.get_ebooks_gridfs()
    )


@router.get(
    "/books",
    response_model=List[schemas.ShowBook],
    summary="Get all books in the gridfs",
)
async def get_all(
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
) -> List[schemas.ShowBook]:
    """
    Get all the books available

    Returns:
    * List[**schemas._Book_**]: List of Books
    """
    return await handler.get_all_book(collection)


@router.get(
    "/book",
    response_model=schemas.ShowBook,
    summary="Get a book in the gridfs",
)
async def get(
    book_title: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
) -> schemas.ShowBook:
    """
    Get a book [if available]

    Returns:
    * **schemas._Book_**: Book information
    """
    return await handler.get_book(book_title, collection)


@router.get(
    "/preview",
    summary="Preview a book",
)
async def preview(
    book_title: str,
    background_tasks: BackgroundTasks,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
):
    """
    Preview a book

    Returns:
    * **FileAPI.Response**: Custom response for a chunk of a file
    """
    return await handler.preview_book(
        book_title, collection, background_tasks, db.get_ebooks_gridfs()
    )


@router.get("/{book_title}/download", summary="Download a specific book")
async def download(
    book_title: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
    # access=Depends(professor_access),
):
    """
    Download a book / ebook

    Allowed Roles:
    * **professor**

    Path Paramters:
    * **book_title** (str): Used for querying database

    Returns:
    * **FileAPI.StreamingResponse**: A download stream response
    """
    return await handler.download_book(
        book_title, collection, db.get_ebooks_gridfs()
    )


@router.put(
    "/{book_title}/update",
    response_model=schemas.ShowBook,
    summary="Update a book in the gridfs",
)
async def update(
    book_title: str,
    changes: schemas.Book = Depends(schemas.Book.as_form),
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
    access=Depends(super_access),
) -> schemas.ShowBook:
    """
    Update a book / ebook

    Allowed ROles:
    * **admin**

    Path Parameters:
    * **book_title** (str): Used for querying database

    Returns:
    * **schemas._Book_**: JSON of the book details
    """
    return await handler.update_book(book_title, changes, collection)


@router.delete(
    "/{book_title}/delete",
    response_model=List[schemas.ShowBook],
    summary="Delete a book in the gridfs",
)
async def delete(
    book_title: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
    access=Depends(super_access),
) -> List[schemas.ShowBook]:
    """
    Delete a book / ebook

    Allowed Roles:
    * **admin**

    Path Parameters:
    * **book_title** (str): Used for querying database

    Returns:
    * List[**schemas._Book_**]: List of Books
    """
    return await handler.delete_book(
        book_title, collection, db.get_ebooks_gridfs()
    )
