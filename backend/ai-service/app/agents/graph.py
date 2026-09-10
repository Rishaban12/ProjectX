"""
A small LangGraph agent graph that powers the /api/chat endpoint.

Graph shape:

    prepare_context -> call_llm -> END

- `prepare_context` normalizes/trims the incoming message list (recent Redis
  history + the new user turn) into the shape the LLM call needs.
- `call_llm` makes the actual OpenAI call and appends the assistant reply to
  `messages`.

This is deliberately small (two nodes), but it is the real thing producing
the chat reply — not a decorative wrapper around a single OpenAI call.
"""
import logging
from typing import TypedDict

from langgraph.graph import StateGraph, START, END

from app.services.openai_client import get_model_name, get_openai_client

logger = logging.getLogger(__name__)

MAX_CONTEXT_MESSAGES = 12
SYSTEM_PROMPT = (
    "You are the AI assistant for ProjectX, a tech studio that builds websites for growing "
    "businesses, runs student tech projects, teaches tech learning sessions (including the "
    "flagship 'AI Invasion & Adaptiveness' track), and offers a resume/career studio. "
    "Be concise, friendly, and helpful."
)


class ChatState(TypedDict):
    """Graph state threaded through the nodes."""
    messages: list[dict]  # [{"role": "user"|"assistant"|"system", "content": str}, ...]


def prepare_context(state: ChatState) -> ChatState:
    """Trim history to a reasonable window and ensure a system prompt is present."""
    messages = state["messages"]
    if not messages or messages[0].get("role") != "system":
        messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages
    # Keep the system prompt plus the most recent turns.
    trimmed = [messages[0]] + messages[1:][-MAX_CONTEXT_MESSAGES:]
    return {"messages": trimmed}


def call_llm(state: ChatState) -> ChatState:
    """Call OpenAI with the prepared messages and append the assistant reply."""
    client = get_openai_client()
    response = client.chat.completions.create(
        model=get_model_name(),
        messages=state["messages"],
        temperature=0.7,
    )
    reply = response.choices[0].message.content or ""
    return {"messages": state["messages"] + [{"role": "assistant", "content": reply}]}


def _build_graph():
    graph = StateGraph(ChatState)
    graph.add_node("prepare_context", prepare_context)
    graph.add_node("call_llm", call_llm)
    graph.add_edge(START, "prepare_context")
    graph.add_edge("prepare_context", "call_llm")
    graph.add_edge("call_llm", END)
    return graph.compile()


chat_graph = _build_graph()
