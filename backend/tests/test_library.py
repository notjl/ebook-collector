from ..main import app
from ..database import db

from fastapi.testclient import TestClient


client = TestClient(app)


def user_bearer_token(username: str, password: str) -> dict:
    client = TestClient(app)
    data = {"username": username, "password": password}
    response = client.post("/login", data=data)
    auth_token = response.json()["access_token"]
    bearer_token = f"Bearer {auth_token}"
    return bearer_token


def test_successful_upload_book():
    headers = {"Authorization": user_bearer_token("professor1", "professor1")}
    with open("Lorem_ipsum.pdf", "rb") as f:
        response = client.post(
            "/library/upload",
            data={"title": "test title", "course_code": "TEST"},
            files={"ebook": ("test.pdf", f, "application/pdf")},
            headers=headers,
        )
    assert response.status_code == 200
    assert not (len(response.json()) == 0)


def test_upload_book_without_file():
    headers = {"Authorization": user_bearer_token("professor1", "professor1")}
    with open("Lorem_ipsum.pdf", "rb") as f:
        response = client.post(
            "/library/upload",
            data={"title": "test title", "course_code": "TEST"},
            headers=headers,
        )
    assert response.status_code == 422


def test_upload_book_missing_req_info():
    headers = {"Authorization": user_bearer_token("professor1", "professor1")}
    with open("Lorem_ipsum.pdf", "rb") as f:
        response = client.post(
            "/library/upload",
            data={"title": "test title"},
            files={"ebook": ("test.pdf", f, "application/pdf")},
            headers=headers,
        )
    assert response.status_code == 422


def test_successful_download_book():
    response = client.get("/library/test title/download")
    assert response.status_code == 200
    assert response.content != None


def test_successful_preview_book():
    response = client.get("/library/preview?book_title=test title")
    assert response.status_code == 200
    assert response.content != None


def test_successful_delete_book():
    headers = {
        "Authorization": user_bearer_token("admin", "somestrongadminpassword")
    }
    response = client.delete("/library/test title/delete", headers=headers)
    assert response.status_code == 200
