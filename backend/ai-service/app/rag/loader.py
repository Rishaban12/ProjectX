"""
Document loading + chunking — SCAFFOLD ONLY, not implemented this pass.

Intended responsibilities once built out:
  - Load raw source documents (e.g. course material, ProjectX docs/FAQs,
    student project write-ups) from disk, object storage, or a database.
  - Normalize/clean text (strip markup, dedupe whitespace, etc).
  - Split documents into overlapping chunks sized for the embedding model's
    context window, keeping enough metadata (source, section, page) to
    attribute retrieved chunks back to their origin.

# TODO(rag): define a `Document` dataclass/model (id, source, text, metadata).
# TODO(rag): implement `load_documents(source: str) -> list[Document]` for at
#            least a local-directory source (e.g. markdown/txt files).
# TODO(rag): implement `chunk_document(doc: Document, chunk_size: int,
#            overlap: int) -> list[Document]` (one sensible chunking
#            strategy — fixed-size with overlap is fine to start).
"""
from typing import Any


def load_documents(source: str) -> list[Any]:
    """
    Load raw documents from `source` (a directory path, URL, or DB query —
    TBD once a concrete document source is chosen).

    NOT IMPLEMENTED — RAG is stubbed in this pass.
    """
    raise NotImplementedError("RAG document loading is not implemented yet. See app/rag/__init__.py.")


def chunk_document(document: Any, chunk_size: int = 500, overlap: int = 50) -> list[Any]:
    """
    Split a loaded document into overlapping chunks suitable for embedding.

    NOT IMPLEMENTED — RAG is stubbed in this pass.
    """
    raise NotImplementedError("RAG chunking is not implemented yet. See app/rag/__init__.py.")
