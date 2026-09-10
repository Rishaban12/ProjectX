"""
ProjectX ai-service — the "AI Platform" of the ProjectX monorepo.

FastAPI app exposing OpenAI-backed chat, resume analysis, and
code-generation-demo endpoints (with a graceful 503 when no OpenAI API key
is configured), plus a stubbed RAG endpoint. See CORE_API_URL — reserved for
future use, not called anywhere in this pass.
"""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers import chat, code_demo, health, rag, resume

logging.basicConfig(level=logging.INFO)

settings = get_settings()

app = FastAPI(
    title="ProjectX AI Service",
    description="AI platform for ProjectX: chat, resume analysis, code-gen demos, and (stubbed) RAG.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(resume.router)
app.include_router(code_demo.router)
app.include_router(rag.router)
