"""
Chatbot service — Tier 1 (product discovery) implementation.

Production approach:
1. Embed the incoming user message.
2. Similarity-search against product embeddings stored in pgvector
   (see: app/models/models.py -> add an `embedding` column to Product
   via a migration, populated by a Celery job on product create/update).
3. Pass the retrieved products + user message to the Claude API and let
   it compose a natural-language answer referencing real catalog data.

This file currently ships a lightweight keyword-matching fallback so the
endpoint works end-to-end before pgvector + embeddings are wired up.
Swap `_keyword_search` for real vector search when ready.
"""

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.models import Product, ProductStatus
from app.schemas.schemas import ProductOut
from app.routers.products import _serialize

try:
    from anthropic import Anthropic

    _client = Anthropic(api_key=settings.ANTHROPIC_API_KEY) if settings.ANTHROPIC_API_KEY else None
except ImportError:
    _client = None


def _keyword_search(db: Session, message: str, limit: int = 4) -> list[Product]:
    words = [w.strip("?.,!").lower() for w in message.split() if len(w) > 3]
    query = db.query(Product).filter(Product.status == ProductStatus.live)
    if words:
        conditions = [Product.title.ilike(f"%{w}%") for w in words]
        from sqlalchemy import or_

        query = query.filter(or_(*conditions))
    return query.limit(limit).all()


def generate_reply(db: Session, message: str) -> tuple[str, list[ProductOut]]:
    matches = _keyword_search(db, message)
    suggestions = [_serialize(p) for p in matches]

    if _client is None:
        # Fallback reply when no Anthropic API key is configured yet.
        if suggestions:
            names = ", ".join(p.title for p in suggestions[:3])
            return (f"Here are a few handcrafted pieces that might fit: {names}.", suggestions)
        return (
            "I couldn't find an exact match yet — try describing the occasion, "
            "budget, or type of craft you're looking for.",
            [],
        )

    catalog_context = "\n".join(f"- {p.title}: {p.description[:120]}" for p in matches) or "No close matches found."
    response = _client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": (
                    "You are the shopping assistant for CraftMela, a handcrafted cultural "
                    "products marketplace. Answer warmly and briefly using only the catalog "
                    f"context below.\n\nCatalog matches:\n{catalog_context}\n\n"
                    f"Customer message: {message}"
                ),
            }
        ],
    )
    reply_text = "".join(block.text for block in response.content if block.type == "text")
    return reply_text, suggestions
