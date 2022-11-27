FROM python:3.10.4
RUN mkdir -p /home/myapp/python_app/
COPY . /home/myapp/python_app/backend/
# COPY ./env /home/myapp/python_app/.env
# COPY ./pdm.lock /home/myapp/python_app/pdm.lock
# COPY ./pyproject.toml /home/myapp/python_app/pyproject.toml
COPY ./requirements.txt /home/myapp/python_app/requirements.txt 
WORKDIR "/home/myapp/python_app/"
# RUN apt-get install libfreetype6-dev
# RUN python -m pip install -U wheel setuptools pip
RUN python -m pip install -r requirements.txt
# EXPOSE 8000
CMD python -m uvicorn backend.main:app --host 0.0.0.0 --port $PORT --reload