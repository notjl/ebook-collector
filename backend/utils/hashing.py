from passlib.hash import argon2


# Using passlib argon2 to hash the password
def argon2h(password: str) -> str:
    return argon2.hash(password)


# Verify hashed password using argon2 verification
def verify(password: str, hashed_password) -> bool:
    return argon2.verify(password, hashed_password)
