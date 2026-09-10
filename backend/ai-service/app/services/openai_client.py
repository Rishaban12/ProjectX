"""
Thin wrapper around the OpenAI Python SDK.

Every router that talks to OpenAI should go through `get_openai_client()` and
catch `OpenAINotConfiguredError` to return a clean HTTP 503 rather than
letting requests crash when no API key is present in this environment.
"""
from functools import lru_cache

from openai import OpenAI

from app.core.config import get_settings


class OpenAINotConfiguredError(RuntimeError):
    """Raised when OPENAI_API_KEY is missing/blank so callers can return a clean 503."""


@lru_cache
def get_openai_client() -> OpenAI:
    """Build (and cache) an OpenAI client. Raises OpenAINotConfiguredError if no API key is set."""
    settings = get_settings()
    if not settings.openai_api_key:
        raise OpenAINotConfiguredError(
            "OPENAI_API_KEY is not configured. Set it in the repo-root .env to enable AI features."
        )
    return OpenAI(api_key=settings.openai_api_key)


def get_model_name() -> str:
    return get_settings().openai_model
