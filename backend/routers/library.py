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
    cover_page: UploadFile | None = None,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
    access=Depends(professor_access),
) -> schemas.ShowBook:
    """
    Upload a book / ebook

    Allowed Roles:
    * **professor**

    Parameters:
    * **ebook** (file): ebook file (pdf, epub, etc.)
    * **cover_page** (file): image file (png, jpg, jpeg)
    * **title** (str): book title
    * **course_code** (str): appropriate course code
    * **author** _Optional_ List(str): names of authors (FN MI LN, FN MI LN, ...)
    * **publisher** _Optional_ (str): publishing company
    * **isbn** _Optional_ List(int): ISBN codes (int, int)
    * **doi** _Optional_ (str): DOI code
    * **description** _Optional_ (str): description of the book

    Returns:
    * **schemas._Book_**: JSON of the book details
    """
    return await handler.upload_ebook(
        book,
        ebook,
        cover_page,
        collection,
        db.get_ebooks_gridfs(),
        db.get_covers_gridfs(),
    )


@router.get(
    "/search",
    response_model=List[schemas.ShowBook],
    summary="Search for book in the gridfs",
)
async def search(
    query: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
) -> List[schemas.ShowBook]:
    """
    Use fuzzy search to look for books in the gridfs

    Parameters:
    * **query** (str) <Book Title> / <Course Code>

    NOTE: Course Code should be with no spaces

    Returns:
    * List[**schemas._Book_**]: List of Books
    """
    return await handler.search_book(query, collection)


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

    Parameters:
    * **book_title**: title of the book

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
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
):
    """
    Preview a book

    Parameters:
    * **book_title**: title of the book

    Returns:
    * **FileAPI.Response**: Custom response for a chunk of a file
    """
    return await handler.preview_book(
        book_title, collection, db.get_ebooks_gridfs()
    )


@router.get("/{book_title}/download", summary="Download a specific book")
async def download(
    book_title: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
):
    """
    Download a book / ebook

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

    Allowed Roles:
    * **admin**

    Parameters:
    * **title** (str): book title
    * **course_code** (str): appropriate course code
    * **author** _Optional_ List(str): names of authors (FN MI LN, FN MI LN, ...)
    * **publisher** _Optional_ (str): publishing company
    * **isbn** _Optional_ List(int): ISBN codes (int, int)
    * **doi** _Optional_ (str): DOI code
    * **description** _Optional_ (str): description of the book

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
        book_title, collection, db.get_ebooks_gridfs(), db.get_covers_gridfs()
    )


@router.get("/{book_title}/cover", summary="Get a book's cover")
async def get_cover(
    book_title: str,
    collection: AsyncIOMotorCollection = Depends(db.get_ebooks_collection),
):
    """
    Get a book's cover from the gridfs

    Path Parameters:
    * **book_title** (str): Used for querying database

    Returns:
    * **image/png** MIME type file
    """
    return await handler.get_cover(
        book_title, collection, db.get_covers_gridfs()
    )
