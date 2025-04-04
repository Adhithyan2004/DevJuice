from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app import database, models, security

# ❌ Remove OAuth2PasswordBearer since we now use Cookies
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admins/admin-login")

# ✅ Authenticate Admin Login
def authenticate_admin(db: Session, username: str, password: str):
    admin = db.query(models.Admin).filter(models.Admin.username == username).first()

    if not admin or not security.verify_password(password, admin.hashed_password):
        return None  # Invalid credentials
    
    return admin  # ✅ Return admin if authentication is successful

# ✅ Get Current Admin from JWT (Now from Cookies)
def get_current_admin(request: Request, db: Session = Depends(database.get_db)):
    # ✅ Extract token from the cookie
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # ✅ Remove "Bearer " prefix before decoding
    token = token.replace("Bearer ", "")

    admin_data = security.decode_access_token(token)

    if not admin_data:
        raise HTTPException(status_code=401, detail="Invalid token")

    admin = db.query(models.Admin).filter(models.Admin.username == admin_data["sub"]).first()
    
    if not admin:
        raise HTTPException(status_code=401, detail="User not found")

    return admin  # ✅ Return the admin object if authenticated