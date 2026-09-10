"""
POST /api/resume/analyze

Sends the candidate's resume text to OpenAI with a structured prompt asking
for JSON, then parses and validates that JSON against `ResumeAnalysis` before
returning it. Powers the resume/career studio track.
"""
import json
import logging

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, ValidationError

from app.services.openai_client import OpenAINotConfiguredError, get_model_name, get_openai_client

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/resume", tags=["resume"])

ANALYSIS_SYSTEM_PROMPT = (
    "You are an expert technical resume reviewer and ATS (Applicant Tracking System) simulator. "
    "Analyze the resume text the user provides and respond with ONLY a single JSON object "
    "(no markdown fences, no commentary) matching exactly this shape:\n"
    "{\n"
    '  "strengths": [string, ...],\n'
    '  "gaps": [string, ...],\n'
    '  "ats_score": integer between 0 and 100,\n'
    '  "suggestions": [string, ...]\n'
    "}"
)


class ResumeAnalyzeRequest(BaseModel):
    resume_text: str


class ResumeAnalysis(BaseModel):
    strengths: list[str] = Field(default_factory=list)
    gaps: list[str] = Field(default_factory=list)
    ats_score: int = Field(ge=0, le=100)
    suggestions: list[str] = Field(default_factory=list)


@router.post("/analyze", response_model=ResumeAnalysis)
def analyze_resume(payload: ResumeAnalyzeRequest):
    try:
        client = get_openai_client()
    except OpenAINotConfiguredError as exc:
        return JSONResponse(
            status_code=503,
            content={"error": "openai_not_configured", "message": str(exc)},
        )

    try:
        response = client.chat.completions.create(
            model=get_model_name(),
            messages=[
                {"role": "system", "content": ANALYSIS_SYSTEM_PROMPT},
                {"role": "user", "content": payload.resume_text},
            ],
            temperature=0.3,
            response_format={"type": "json_object"},
        )
        raw = response.choices[0].message.content or "{}"
        parsed = json.loads(raw)
        return ResumeAnalysis.model_validate(parsed)
    except (json.JSONDecodeError, ValidationError) as exc:
        logger.exception("Model returned unparseable/invalid resume analysis JSON")
        return JSONResponse(
            status_code=502,
            content={"error": "invalid_model_output", "message": f"Could not parse model response: {exc}"},
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("Resume analysis failed")
        return JSONResponse(
            status_code=502,
            content={"error": "upstream_error", "message": f"Failed to get a response from the model: {exc}"},
        )
