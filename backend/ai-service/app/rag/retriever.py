"""
Embedding + vector store + similarity search — SCAFFOLD ONLY, not implemented
this pass.

Intended responsibilities once built out:
  - Embed chunks (e.g. via the OpenAI embeddings API) and store the vectors
    in a vector DB. Leading candidates given the existing stack:
      - pgvector on the Postgres instance already in docker-compose.yml, or
      - Chroma as a lighter-weight standalone option.
  - At query time: embed the incoming query, run a similarity search against
    the store, and return the top-k matching chunks (with their source
    metadata) for the caller to feed into a prompt.

# TODO(rag): choose the vector store (pgvector vs Chroma) and add its
#            dependency to requirements.txt only once this is implemented.
# TODO(rag): implement `embed_chunks(chunks: list) -> None` to embed + upsert
#            chunks into the store.
# TODO(rag): implement `similarity_search(query: str, top_k: int = 5) -> list`
#            returning the top-k most relevant chunks for a query.
# TODO(rag): wire retrieved chunks into app/agents/graph.py as an additional
#            "retrieve_context" node ahead of `call_llm`, once this is real.
"""
from typing import Any


def embed_chunks(chunks: list[Any]) -> None:
    """
    Embed a list of document chunks and upsert them into the vector store.

    NOT IMPLEMENTED — RAG is stubbed in this pass.
    """
    raise NotImplementedError("RAG embedding is not implemented yet. See app/rag/__init__.py.")


def similarity_search(query: str, top_k: int = 5) -> list[Any]:
    """
    Return the top_k chunks most similar to `query` from the vector store.

    NOT IMPLEMENTED — RAG is stubbed in this pass.
    """
    raise NotImplementedError("RAG similarity search is not implemented yet. See app/rag/__init__.py.")
