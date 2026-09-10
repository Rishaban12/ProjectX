"""
POST /api/code-demo/generate

A real OpenAI-backed "code generation demo" endpoint used to showcase the
AI Invasion & Adaptiveness learning track: given a natural-language prompt
(and optional target language), returns generated code plus a short
explanation.
"""
import json
import logging

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.services.openai_client import OpenAINotConfiguredError, get_model_name, get_openai_client

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/code-demo", tags=["code-demo"])

SYSTEM_PROMPT = (
    "You are a coding assistant used in a live tech-learning demo. Given a request, produce "
    "working, idiomatic code in the requested language (default to Python if unspecified) plus a "
    "short plain-language explanation of how it works. Respond with ONLY a single JSON object "
    '(no markdown fences) of the shape {"code": string, "explanation": string}.'
)


class CodeDemoRequest(BaseModel):
    prompt: str
    language: str | None = None


class CodeDemoResponse(BaseModel):
    code: str
    explanation: str


@router.post("/generate", response_model=CodeDemoResponse)
def generate_code(payload: CodeDemoRequest):
    try:
        client = get_openai_client()
    except OpenAINotConfiguredError as exc:
        return JSONResponse(
            status_code=503,
            content={"error": "openai_not_configured", "message": str(exc)},
        )

    language_hint = payload.language or "a language you think best fits the request"
    user_prompt = f"Target language: {language_hint}\nRequest: {payload.prompt}"

    try:
        response = client.chat.completions.create(
            model=get_model_name(),
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.4,
            response_format={"type": "json_object"},
        )
        raw = response.choices[0].message.content or "{}"
        parsed = json.loads(raw)
        return CodeDemoResponse(code=parsed.get("code", ""), explanation=parsed.get("explanation", ""))
    except json.JSONDecodeError as exc:
        logger.exception("Model returned unparseable code-demo JSON")
        return JSONResponse(
            status_code=502,
            content={"error": "invalid_model_output", "message": f"Could not parse model response: {exc}"},
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("Code demo generation failed")
        return JSONResponse(
            status_code=502,
            content={"error": "upstream_error", "message": f"Failed to get a response from the model: {exc}"},
        )
