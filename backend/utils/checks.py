# Wrapper for checking a document exists in the collection
async def check_if_exists(document, collection, key) -> bool:
    temp_data = await collection.find_one({key: document[key]})
    try:
        if document[key] == temp_data[key]:
            return True
    except BaseException:
        return False
