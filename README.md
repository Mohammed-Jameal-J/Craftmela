# CraftMela

Handcrafted Cultural Treasures For Every Celebration — a multi-vendor
marketplace connecting buyers with artisan vendors selling festival, faith,
and celebration products. Inspired by InstaMela, built with its own design
identity ("Sage & Sandstone").

## What's in this repo

```
craftmela/
├── frontend/     Next.js 14 + TypeScript storefront (Tailwind, react-icons)
├── backend/      FastAPI + PostgreSQL API (auth, catalog, orders, chatbot)
└── README.md     You are here
```

Each folder has its own detailed `README.md` with setup instructions —
start there. This file is the map.

## Quick start (both apps)

**Terminal 1 — backend:**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL, CLOUDINARY_*, ANTHROPIC_API_KEY
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 — frontend:**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Then open http://localhost:3000. The storefront renders immediately with
local sample data; connect it to the live API by following the "Connecting
to the real backend" section in `frontend/README.md`.

## Design system

| | |
|---|---|
| Palette | Sage `#4B6B4F` · Sandstone `#F1E9DD` · Terracotta `#B5602E` · Gold `#C9A961` · Charcoal `#2E2B24` |
| Fonts | Fraunces (headings) + Inter (body/UI), via `next/font` |
| Icons | `react-icons` (Feather + Game Icons sets) — no AI-generated icon packs |
| Images | Cloudinary for product photos + CDN delivery; hand-coded SVG for decorative banners |

## What's built vs. what's next

**Built and working end-to-end:**
- Responsive storefront: home, category, product detail, cart, checkout, about, vendor apply
- FastAPI backend: auth (JWT), categories, products, vendor onboarding + admin approval, checkout/orders, chatbot endpoint
- Chatbot widget wired to `/api/chatbot`, with a working keyword-search fallback and a Claude API integration ready to activate
- Cloudinary upload service

**Not yet built (see each README's "Next steps" section):**
- Admin panel (separate Next.js app / route group) — moderation, CMS, payouts
- Full vendor dashboard (product upload, order fulfillment, payouts UI)
- pgvector-based semantic search for the chatbot (currently keyword-based)
- Payment gateway webhook handling (Razorpay/Stripe)
- Alembic migrations, authentication pages (login/signup UI), Celery job wiring

## Reference documents

If you have the earlier FRD and color-palette planning docs from this
project, use them alongside this codebase — the page list and workflows in
the FRD map directly to the routes/routers built here.
