from fastapi import APIRouter, Depends, HTTPException , Response
from sqlalchemy.orm import Session
from app import database, models, schemas, security, auth
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Admin Login Route (Returns JWT Token)
@router.post("/admin-login", response_model=schemas.Token)
def login_admin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    admin = auth.authenticate_admin(db, form_data.username, form_data.password)
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # ✅ Generate JWT Token
    access_token = security.create_access_token(data={"sub": admin.username})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": schemas.AdminResponse(id=admin.id, username=admin.username, is_superuser=admin.is_superuser)
    }



@router.post("/register", response_model=schemas.AdminResponse)
def register_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    existing_admin = db.query(models.Admin).filter(models.Admin.username == admin.username).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")

    hashed_password = security.hash_password(admin.password)
    new_admin = models.Admin(username=admin.username, hashed_password=hashed_password, is_superuser=True)
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin
 