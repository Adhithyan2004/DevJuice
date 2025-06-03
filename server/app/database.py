from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
# import socket
# import psycopg2
from dotenv import load_dotenv


# orig_getaddrinfo = socket.getaddrinfo


# def ipv4_only_getaddrinfo(*args, **kwargs):
#     return [ai for ai in orig_getaddrinfo(*args, **kwargs) if ai[0] == socket.AF_INET]


# socket.getaddrinfo = ipv4_only_getaddrinfo

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
