import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from datetime import datetime, timedelta, timezone
# Should change to PyJwt instead of jose as it is not secure!
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()
# Load environment variables from .env file

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
# Default to 60 minutes if not set in .env
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#  Hash Password
def hash_password(password: str):
    return pwd_context.hash(password)


#  Verify Password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


#  Create JWT Token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


#  Decode and validate JWT token
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # contains 'sub', 'exp', etc.
    except ExpiredSignatureError:
        print(" Token has expired")
        return None
    except InvalidTokenError:
        print(" Invalid token")
        return None
