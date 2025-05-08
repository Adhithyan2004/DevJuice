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


from fastapi import Depends, HTTPException, status
from app.models import Admin


# ✅ Get Current Admin from JWT
# TODO remove debug logs before production
def get_current_admin(request: Request, db: Session = Depends(database.get_db)):
    token = request.cookies.get("access_token")
    print("🔍 Token from cookie:", token)

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = token.replace("Bearer ", "")
    admin_data = security.decode_access_token(token)
    print("🔍 Decoded token data:", admin_data)

    if not admin_data:
        raise HTTPException(status_code=401, detail="Invalid token")

    admin = (
        db.query(models.Admin)
        .filter(models.Admin.username == admin_data["sub"])
        .first()
    )
    print(
        "🔍 Admin found in DB:", admin.username, "| is_superuser:", admin.is_superuser
    )

    if not admin:
        raise HTTPException(status_code=401, detail="User not found")

    return admin


def get_super_admin(current_admin: Admin = Depends(get_current_admin)):
    if not current_admin.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Super admin only.",
        )
    return current_admin
