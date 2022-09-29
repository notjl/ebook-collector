import asyncio
from copy import deepcopy
from typing import List

from fastapi import HTTPException, UploadFile, status
from motor.motor_asyncio import (
    AsyncIOMotorCollection,
    AsyncIOMotorGridFSBucket,
)

from ..database import schemas
from ..utils.checks import check_if_exists, virus_analysis
from ..utils.hashing import file_hashing


async def upload_ebook(
    book: schemas.Book,
    ebook: UploadFile,
    collection: AsyncIOMotorCollection,
    gridfs: AsyncIOMotorGridFSBucket,
) -> schemas.Book:
    tmp = book.dict()
    tmp_file = deepcopy(ebook)

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

    if await virus_analysis(tmp["hashes"]["sha256"], tmp_file.file):
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail=f"""
            Book [{ebook.filename}] is suspected of having malicious
            and suspicious software by VirusTotal.
            """,
        )

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


async def get_all_book(
    collection: AsyncIOMotorCollection,
) -> List[schemas.Book]:
    return [schemas.ShowBook(**document) async for document in collection.find({})]


async def delete_book(
    book_title: str,
    collection: AsyncIOMotorCollection,
    gridfs: AsyncIOMotorGridFSBucket,
) -> List[schemas.Book]:
    document: schemas.Book = await collection.find_one({"title": book_title})
    await gridfs.delete(document["_id"])
    return [schemas.ShowBook(**doc) async for doc in collection.find({})]
