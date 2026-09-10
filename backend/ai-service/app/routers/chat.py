"""
POST /api/chat

Runs the LangGraph chat agent (app/agents/graph.py) with recent per-session
history pulled from Redis (if a session_id is given), then persists the
updated history back to Redis.
"""
import logging
import uuid

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.agents.graph import chat_graph
from app.core.redis_client import get_history, save_history
from app.services.openai_client import OpenAINotConfiguredError

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


@router.post("", response_model=ChatResponse)
def chat(payload: ChatRequest):
    session_id = payload.session_id or str(uuid.uuid4())
    history = get_history(session_id)
    messages = history + [{"role": "user", "content": payload.message}]

    try:
        result = chat_graph.invoke({"messages": messages})
    except OpenAINotConfiguredError as exc:
        return JSONResponse(
            status_code=503,
            content={
                "error": "openai_not_configured",
                "message": str(exc),
            },
        )
    except Exception as exc:  # noqa: BLE001 - never let an upstream failure crash the request
        logger.exception("Chat graph invocation failed")
        return JSONResponse(
            status_code=502,
            content={"error": "upstream_error", "message": f"Failed to get a response from the model: {exc}"},
        )

    updated_messages = result["messages"]
    reply = updated_messages[-1]["content"]
    save_history(session_id, updated_messages)

    return ChatResponse(reply=reply, session_id=session_id)
