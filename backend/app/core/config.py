from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings derived from environment variables."""

    PROJECT_NAME: str = "vuqora-api"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    
    # Application database is PostgreSQL. Default dev URL uses PostgreSQL async driver.
    # Production configuration will receive DATABASE_URL for Neon PostgreSQL via environment.
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/vuqora_dev"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
