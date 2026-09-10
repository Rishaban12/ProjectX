"""
Thin Redis helper for per-session chat history.

Used only by the chat router to keep a short rolling window of recent turns
per `session_id`, so the LangGraph agent has some conversational context.
This is intentionally lightweight (not a durable store) — if Redis is
unreachable we log and continue without history rather than failing the
request, since chat should still work without memory.
"""
import json
import logging
from typing import Optional

import redis

from app.core.config import get_settings

logger = logging.getLogger(__name__)

HISTORY_TTL_SECONDS = 60 * 60  # 1 hour
MAX_TURNS = 10  # keep the last N messages (user + assistant combined)

_client: Optional[redis.Redis] = None


def _get_client() -> Optional[redis.Redis]:
    """Lazily build a Redis client. Returns None if Redis can't be reached."""
    global _client
    if _client is not None:
        return _client
    settings = get_settings()
    try:
        client = redis.Redis.from_url(settings.redis_url, decode_responses=True, socket_connect_timeout=1)
        client.ping()
        _client = client
        return _client
    except Exception as exc:  # noqa: BLE001 - Redis being down must never crash a request
        logger.warning("Redis unavailable at %s (%s) — continuing without chat history", settings.redis_url, exc)
        return None


def _key(session_id: str) -> str:
    return f"ai-service:chat-history:{session_id}"


def get_history(session_id: str) -> list[dict]:
    """Return the stored list of {role, content} turns for a session, or [] on any failure."""
    if not session_id:
        return []
    client = _get_client()
    if client is None:
        return []
    try:
        raw = client.get(_key(session_id))
        if not raw:
            return []
        return json.loads(raw)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Failed to read chat history for session %s: %s", session_id, exc)
        return []


def save_history(session_id: str, messages: list[dict]) -> None:
    """Persist the last MAX_TURNS messages for a session with a TTL. No-op on failure."""
    if not session_id:
        return
    client = _get_client()
    if client is None:
        return
    try:
        trimmed = messages[-MAX_TURNS:]
        client.set(_key(session_id), json.dumps(trimmed), ex=HISTORY_TTL_SECONDS)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Failed to save chat history for session %s: %s", session_id, exc)
