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


client.headers["Authorization"] = user_bearer_token(
    "admin", "somestrongadminpassword"
)


def test_successful_create_user():
    response = client.post(
        "/user/create",
        json={
            "username": "test_account",
            "email": "test@account.com",
            "password": "testpassword",
            "role": "testrole",
        },
    )
    data = response.json()
    assert response.status_code == 200
    assert data["username"] == "test_account"
    assert data["email"] == "test@account.com"


def test_create_existing_user():
    response = client.post(
        "/user/create",
        json={
            "username": "test_account",
            "email": "test@account.com",
            "password": "testpassword",
            "role": "testrole",
        },
    )
    assert response.status_code == 409
    assert response.json() == {"detail": "User [test_account] exists"}


def test_create_user_missing_info():
    response = client.post(
        "/user/create",
        json={
            "username": "test_account",
            "email": "test@account.com",
            "role": "testrole",
        },
    )
    assert response.status_code == 422


def test_successful_update_user():
    response = client.put(
        "/user/test_account/update",
        json={
            "username": "test_account_update",
            "email": "test_update@account.com",
            "password": "testpassword",
            "role": "testrole",
        },
    )
    data = response.json()
    assert response.status_code == 200
    assert data["username"] == "test_account_update"
    assert data["email"] == "test_update@account.com"


def test_update_non_existing_user():
    response = client.put(
        "/user/test_account/update",
        json={
            "username": "test_account_update",
            "email": "test_update@account.com",
            "password": "testpassword",
            "role": "testrole",
        },
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "User [test_account] does not exist!"}


def test_update_existing_user():
    response = client.put(
        "/user/test_account_update/update",
        json={
            "username": "professor1",
            "email": "test_update@account.com",
            "password": "testpassword",
            "role": "testrole",
        },
    )
    assert response.status_code == 409
    assert response.json() == {"detail": "User [professor1] exists"}


def test_update_user_missing_info():
    response = client.put(
        "/user/test_account_update/update",
        json={
            "username": "professor1",
            "email": "test_update@account.com",
            "role": "testrole",
        },
    )
    assert response.status_code == 422


def test_successful_delete_user():
    response = client.delete(
        "/user/test_account_update/delete",
    )
    assert response.status_code == 200


def test_delete_non_existing_user():
    response = client.delete(
        "/user/test_account/delete",
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "User [test_account] does not exist!"}
