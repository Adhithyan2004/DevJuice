from fastapi import APIRouter, Depends, HTTPException, Response, status
from datetime import timedelta
from sqlalchemy.orm import Session
from app import database, models, schemas, security
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import get_current_admin

router = APIRouter()


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour


@router.post("/admin-login")
def admin_login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db),
):
    admin = (
        db.query(models.Admin)
        .filter(models.Admin.username == form_data.username)
        .first()
    )

    if not admin or not security.verify_password(
        form_data.password, admin.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    if not admin.is_approved:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Admin approval pending"
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": admin.username}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True,  # ✅ Use True in production
        samesite="None",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {"message": "Login successful"}


# ✅ Protected Admin Registration Route
@router.post("/register", response_model=schemas.AdminResponse)
def register_admin(
    admin: schemas.AdminCreate,
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin),  # 🛡️ Protects the route
):
    if not current_admin.is_superuser:
        raise HTTPException(
            status_code=403, detail="Only superusers can register new admins"
        )

    existing_admin = (
        db.query(models.Admin).filter(models.Admin.username == admin.username).first()
    )
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")

    hashed_password = security.hash_password(admin.password)
    new_admin = models.Admin(
        username=admin.username,
        hashed_password=hashed_password,
        is_superuser=True,
        is_approved=True,
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin


@router.post("/logout")
def logout_admin(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}


@router.get("/me")
def get_admin(admin: models.Admin = Depends(get_current_admin)):
    return {"username": admin.username}


# Admin routes for future scalability (admin approve system) 





# @router.post("/approve-admin")
# def approve_admin(
#     username: str,
#     db: Session = Depends(get_db),
#     current_admin: models.Admin = Depends(get_current_admin),
# ):
#     if not current_admin.is_superuser:
#         raise HTTPException(
#             status_code=403, detail="Only superusers can approve new admins"
#         )

#     admin = db.query(models.Admin).filter(models.Admin.username == username).first()
#     if not admin:
#         raise HTTPException(status_code=404, detail="Admin not found")

#     admin.is_approved = True
#     db.commit()
#     return {"message": "Admin approved successfully"}


# @router.post("/request-admin")
# def request_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
#     existing_admin = (
#         db.query(models.Admin).filter(models.Admin.username == admin.username).first()
#     )
#     if existing_admin:
#         raise HTTPException(status_code=400, detail="Admin already exists")

#     hashed_password = security.hash_password(admin.password)
#     new_admin = models.Admin(
#         username=admin.username,
#         hashed_password=hashed_password,
#         is_superuser=False,
#         is_approved=False,  # ❗️Not yet approved
#     )
#     db.add(new_admin)
#     db.commit()
#     return {"message": "Admin access requested successfully"}
