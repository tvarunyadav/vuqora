from fastapi import FastAPI

from app.api.router import api_router
from app.schemas.health import HealthResponse

app = FastAPI(
    title="VUQORA API",
    description="Backend API service for VUQORA mobile-first restaurant menu companion.",
    version="0.1.0",
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def root_health() -> HealthResponse:
    """Root health check endpoint."""
    return HealthResponse(
        status="ok",
        service="vuqora-api",
    )
