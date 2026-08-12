import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.models import ChatMessage, ChatSession
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.chatbot_service import generate_reply

router = APIRouter(prefix="/api/chatbot", tags=["chatbot"])


@router.post("", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    session_id = payload.session_id or str(uuid.uuid4())

    session = db.get(ChatSession, session_id)
    if not session:
        session = ChatSession(id=session_id)
        db.add(session)
        db.commit()

    db.add(ChatMessage(session_id=session_id, role="user", content=payload.message))
    db.commit()

    reply_text, suggestions = generate_reply(db, payload.message)

    db.add(ChatMessage(session_id=session_id, role="assistant", content=reply_text))
    db.commit()

    return ChatResponse(session_id=session_id, reply=reply_text, product_suggestions=suggestions)
