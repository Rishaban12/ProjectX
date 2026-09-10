"""
POST /api/rag/query

RAG is intentionally stubbed in this pass: no vector DB is wired up yet.
This returns HTTP 501 with a message pointing at app/rag/ for the planned
pipeline structure (loader.py, retriever.py).
"""
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

router = APIRouter(prefix="/api/rag", tags=["rag"])


class RagQueryRequest(BaseModel):
    query: str


@router.post("/query")
def rag_query(payload: RagQueryRequest):
    return JSONResponse(
        status_code=501,
        content={
            "error": "not_implemented",
            "message": (
                "RAG is not wired up yet in this pass — no vector DB is configured. "
                "See app/rag/ (loader.py for ingest/chunk, retriever.py for embed/similarity "
                "search) for the planned pipeline structure and TODOs."
            ),
        },
    )
