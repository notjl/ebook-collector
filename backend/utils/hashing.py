import hashlib

from fastapi import UploadFile
from passlib.hash import argon2


async def file_hashing(file: UploadFile):
    CHUNK_SIZE = 65536  # Chunk is 64Kb
    md5 = hashlib.md5()
    sha1 = hashlib.sha1()
    sha256 = hashlib.sha256()
    while chunk := await file.read(CHUNK_SIZE):
        md5.update(chunk)
        sha1.update(chunk)
        sha256.update(chunk)
    await file.seek(0)

    return {
        "md5": md5.hexdigest(),
        "sha1": sha1.hexdigest(),
        "sha256": sha256.hexdigest(),
    }


def argon2h(password: str) -> str:
    # Using passlib argon2 to hash the password
    return argon2.hash(password)


def verify(password: str, hashed_password) -> bool:
    # Verify hashed password using argon2 verification
    return argon2.verify(password, hashed_password)
