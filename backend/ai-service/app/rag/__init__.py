"""
RAG (Retrieval-Augmented Generation) pipeline — SCAFFOLD ONLY.

This package is intentionally a stub in this pass. It documents the intended
shape of the pipeline so it can be filled in later without redesigning the
module layout:

    app/rag/loader.py     - ingest raw documents, split into chunks
    app/rag/retriever.py  - embed chunks into a vector DB, similarity search

Planned flow:
    ingest documents -> chunk -> embed -> store in a vector DB
    (pgvector or Chroma are the leading candidates given the existing
    Postgres instance in docker-compose) -> similarity search at query time
    -> feed retrieved chunks into the chat/agent graph as extra context.

None of this is wired up yet. See app/routers/rag.py, which currently
returns HTTP 501 for POST /api/rag/query.
"""
