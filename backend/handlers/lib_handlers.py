import asyncio
import pathlib
from contextlib import suppress
from typing import List

import fitz
from fastapi import HTTPException, UploadFile, status
from fastapi.responses import Response, StreamingResponse
from motor.motor_asyncio import (
    AsyncIOMotorCollection,
    AsyncIOMotorGridFSBucket,
)

from ..database import schemas
from ..utils.checks import check_if_exists
from ..utils.hashing import file_hashing


ALLOWED_EXT = [".pdf", ".xps", ".oxps", ".cbz", ".fb2", ".epub"]
ALLOWED_IMG_EXT = [".png", ".jpeg", ".jpg"]


async def upload_ebook(
    book: schemas.Book,
    ebook: UploadFile,
    cover: UploadFile,
    collection: AsyncIOMotorCollection,
    gridfs: AsyncIOMotorGridFSBucket,
) -> schemas.Book:
    tmp = book.dict()
    file_type = pathlib.Path(ebook.filename).suffix

    if not file_type in ALLOWED_EXT:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File extension is not in {ALLOWED_EXT}",
        )

    if await check_if_exists(tmp["title"], collection, "title"):
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail=f'Book titled [{tmp["title"]}] exists',
        )

    if await check_if_exists(ebook.filename, collection, "filename"):
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail=f"Book with file named [{ebook.filename}] exists",
        )

    tmp["hashes"] = await file_hashing(ebook)

    if await check_if_exists(tmp["hashes"], collection, "hashes"):
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail=f"Book with hashing [{tmp['hashes']}] exists",
        )

    with suppress(Exception):
        tmp["author"] = [x.strip() for x in tmp["author"].split(",")]

    with suppress(Exception):
        tmp["isbn"] = [x.strip() for x in tmp["isbn"].split(",")]

    if not cover:
        with fitz.open(file_type, await ebook.read()) as tmp_doc:
            content = tmp_doc[0].get_pixmap().tobytes()
            tmp_filename = ebook.filename + ".png"
            cover_grid_id = await gridfs.upload_from_stream(
                tmp_filename, content
            )
    else:
        if pathlib.Path(cover.filename).suffix in ALLOWED_IMG_EXT:
            cover_grid_id = await gridfs.upload_from_stream(
                cover.filename, cover.file
            )
        else:
            with fitz.open(file_type, await ebook.read()) as tmp_doc:
                content = tmp_doc[0].get_pixmap().tobytes()
                tmp_filename = ebook.filename + ".png"
                cover_grid_id = await gridfs.upload_from_stream(
                    tmp_filename, content
                )

    tmp["cover_id"] = cover_grid_id

    await ebook.seek(0)

    async with gridfs.open_upload_stream(ebook.filename) as grid_in:
        await asyncio.gather(*[grid_in.set(k, v) for k, v in tmp.items()])
        await grid_in.write(ebook.file)

    book_document = await collection.find_one({"title": tmp["title"]})

    if not book_document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Something went wrong / Bad request",
        )

    return book_document


async def search_book(
    query: str, collection: AsyncIOMotorCollection
) -> schemas.Book:
    return [
        schemas.ShowBook(**document)
        async for document in collection.find(
            {
                "$text": {
                    "$search": query,
                },
            }
        )
    ]


async def get_book(
    book_title: str, collection: AsyncIOMotorCollection
) -> schemas.Book:
    document: schemas.Book = await collection.find_one({"title": book_title})
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book [{book_title}] does not exist!",
        )
    return document


async def get_all_book(
    collection: AsyncIOMotorCollection,
) -> List[schemas.Book]:
    return [
        schemas.ShowBook(**document) async for document in collection.find({})
    ]


async def preview_book(
    book_title: str,
    collection: AsyncIOMotorCollection,
    gridfs: AsyncIOMotorGridFSBucket,
):
    async def get_file(document):
        grid_out = await gridfs.open_download_stream(document["_id"])
        content = await grid_out.read()
        return content

    document: schemas.Book = await collection.find_one({"title": book_title})
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book [{book_title}] does not exist!",
        )

    file_ext = pathlib.Path(document["filename"]).suffix
    with fitz.open(
        file_ext, await get_file(document)
    ) as tmp_file, fitz.open() as preview_file:
        preview_file.insert_pdf(tmp_file, to_page=9)

        headers = {"Content-Disposition": "inline"}
        return Response(
            preview_file.tobytes(),
            headers=headers,
            media_type="application/pdf",
        )


async def download_book(
    book_title: str,
    collection: AsyncIOMotorCollection,
    gridfs: AsyncIOMotorGridFSBucket,
):
    async def iterfile(document):
        grid_out = await gridfs.open_download_stream(document["_id"])
        content = await grid_out.read()
        yield content

    document: schemas.Book = await collection.find_one({"title": book_title})
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book [{book_title}] does not exist!",
        )

    file_ext = pathlib.Path(document["filename"]).suffix
    filename = document["title"] + file_ext
    headers = {"Content-Disposition": f"attachment; filename={filename}"}
    return StreamingResponse(iterfile(document), headers=headers)


async def update_book(
    book_title: str, changes: schemas.Book, collection: AsyncIOMotorCollection
) -> schemas.Book:
    tmp = changes.dict()

    if not await check_if_exists(book_title, collection, "title"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book [{book_title}] does not exist!",
        )

    if await check_if_exists(tmp["title"], collection, "title"):
        raise HTTPException(
            status_code=status.HTTP_302_FOUND,
            detail=f'Book [{tmp["title"]}] exists',
        )

    await collection.update_one(
        {
            "title": book_title,
        },
        {
            "$set": tmp,
        },
    )

    return await get_book(tmp["title"], collection)


async def delete_book(
    book_title: str,
    collection: AsyncIOMotorCollection,
    gridfs: AsyncIOMotorGridFSBucket,
) -> List[schemas.Book]:
    document: schemas.Book = await collection.find_one({"title": book_title})
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book [{book_title}] does not exist!",
        )
    await gridfs.delete(document["_id"])
    await gridfs.delete(document["cover_id"])
    return [schemas.ShowBook(**doc) async for doc in collection.find({})]
