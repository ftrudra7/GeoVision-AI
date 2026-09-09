from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
from app.core.config import settings
from app.db.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GeoVision AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "GeoVision API"}
