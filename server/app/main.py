from fastapi import FastAPI
from app.routers import tools  # Ensure this is correctly imported
from app.database import engine, Base, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from app.routers import admin_routes
from fastapi import FastAPI
from fastapi.responses import JSONResponse


app = FastAPI()
db = SessionLocal()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://dev-juice.vercel.app"
    ],  # Allow all origins (change to specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(tools.router, prefix="/tools", tags=["tools"])
app.include_router(admin_routes.router, prefix="/admins", tags=["admins"])


@app.get("/")
def read_root():
    return {"API is running!"}

@app.api_route("/ping", methods=["GET", "HEAD"])
def ping():
    return JSONResponse(content={"status": "ok"})
