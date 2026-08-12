# CraftMela — Backend (FastAPI)

REST API for the CraftMela handcrafted cultural marketplace: auth, catalog,
vendor onboarding, orders, and an AI chatbot endpoint.

## Tech stack

- **FastAPI** — API framework
- **PostgreSQL + SQLAlchemy** — database + ORM
- **Redis + Celery** — background jobs (email, image processing, embeddings)
- **Cloudinary** — image storage, optimization, CDN delivery
- **Meilisearch** — product search
- **Anthropic (Claude API)** — chatbot
- **Razorpay / Stripe** — payments

## 1. Prerequisites

- Python 3.11+
- PostgreSQL running locally (or a hosted instance)
- Redis running locally (or a hosted instance)
- A free [Cloudinary](https://cloudinary.com) account (cloud name + API key/secret)

## 2. Setup

```bash
# from the backend/ folder
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env
# then edit .env with your real DATABASE_URL, CLOUDINARY_*, ANTHROPIC_API_KEY, etc.
```

Create the database (if it doesn't exist yet):

```bash
createdb craftmela
```

## 3. Run the dev server

```bash
uvicorn app.main:app --reload --port 8000
```

- API root: http://localhost:8000
- Interactive docs (Swagger): http://localhost:8000/docs
- Health check: http://localhost:8000/api/health

On first run, tables are auto-created from the SQLAlchemy models. For real
schema changes going forward, set up Alembic migrations instead of relying
on `create_all`.

## 4. Project structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app entrypoint, router registration
│   ├── core/
│   │   ├── config.py        # Settings loaded from .env
│   │   ├── security.py      # Password hashing, JWT creation/verification
│   │   └── deps.py          # Auth dependencies (get_current_user, require_role)
│   ├── db/
│   │   └── database.py      # SQLAlchemy engine/session setup
│   ├── models/
│   │   └── models.py        # User, Vendor, Product, Order, Review, Chat, etc.
│   ├── schemas/
│   │   └── schemas.py       # Pydantic request/response models
│   ├── routers/
│   │   ├── auth.py          # /api/auth (signup, login)
│   │   ├── categories.py    # /api/categories
│   │   ├── products.py      # /api/products
│   │   ├── vendors.py       # /api/vendors (onboarding + admin approval)
│   │   ├── orders.py        # /api/orders (checkout, order history)
│   │   └── chatbot.py       # /api/chatbot
│   └── services/
│       ├── cloudinary_service.py   # Image upload helpers
│       └── chatbot_service.py      # RAG + Claude API chatbot logic
├── requirements.txt
├── .env.example
└── README.md
```

## 5. Roles

- `buyer` — default role on signup
- `vendor` — apply via `POST /api/vendors/apply`, requires admin approval
- `admin` / `super_admin` — approve vendors, moderate products (assign manually in DB for now; build an admin-invite flow later)

## 6. What's stubbed vs. production-ready

| Area | Status |
|---|---|
| Auth, catalog, cart/checkout, vendor onboarding | Functional CRUD, ready to extend |
| Payments | Checkout creates the order; wire the Razorpay/Stripe webhook to flip `order.status` to `paid` |
| Chatbot | Works with keyword search out of the box; swap in pgvector similarity search + `ANTHROPIC_API_KEY` for full RAG |
| Image upload endpoint | Service function ready (`cloudinary_service.py`); add a router endpoint that accepts `UploadFile` and calls it |
| Migrations | Currently `Base.metadata.create_all` — move to Alembic before production |

## 7. Next steps

- Add Alembic migrations
- Add an admin-only products moderation endpoint (approve/reject `pending_review`)
- Wire Celery for: order confirmation emails, payout batch jobs, chatbot embedding refresh
- Add rate limiting on `/api/auth/*` and `/api/chatbot`
