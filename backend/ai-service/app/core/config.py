"""
Application configuration for ai-service.

Reads settings from environment variables (as injected by docker-compose.yml
at the repo root, or from a local .env when running standalone), with
sensible local-dev defaults so the service also runs directly against a
docker-compose'd Redis without any extra setup.
"""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    # Redis (per-session chat history cache)
    redis_url: str = "redis://localhost:6379/0"

    # core-api (Spring Boot) — not called from this pass, provided for future use
    core_api_url: str = "http://localhost:8080"

    # CORS
    cors_allowed_origins: str = "http://localhost:5180"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origins_list(self) -> list[str]:
        """CORS_ALLOWED_ORIGINS as a comma-separated env var, split into a list."""
        return [origin.strip() for origin in self.cors_allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Cached settings accessor — env is read once per process."""
    return Settings()
