from contextlib import suppress


async def check_if_exists(document, collection, key) -> bool:
    # Wrapper for checking a document exists in the collection
    temp_data = await collection.find_one({key: document[key]})
    with suppress(Exception):
        if document[key] == temp_data[key]:
            return True

    return False
