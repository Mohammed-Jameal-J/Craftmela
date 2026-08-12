# CraftMela — Frontend (Next.js)

Buyer-facing storefront for the CraftMela handcrafted cultural marketplace.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — styled with the "Sage & Sandstone" design system
- **react-icons** — `Fi` (Feather) for UI icons, `Gi` (Game Icons) for category icons — no AI-generated icon assets
- **next/font** — self-hosted Google Fonts (Fraunces + Inter), zero layout shift

## 1. Setup

```bash
# from the frontend/ folder
npm install

cp .env.local.example .env.local
# edit .env.local with your backend URL once it's running
```

## 2. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 — the homepage renders fully with local sample
data even before the backend is running (see `src/lib/sample-data.ts`).

## 3. Connecting to the real backend

Every page currently imports from `src/lib/sample-data.ts`. Once the
FastAPI backend (see `../backend`) is running:

1. Replace `sampleProducts` / `sampleCategories` imports with calls to
   `apiFetch<Product[]>("/api/products")` from `src/lib/api.ts`.
2. Convert the pages that need live data to `async` Server Components
   (Next.js App Router supports `await apiFetch(...)` directly inside
   `page.tsx`).
3. Swap the local SVG festival banners in `public/images/` for real
   Cloudinary URLs once the admin CMS can upload them.

## 4. Design system reference

| Token | Hex | Tailwind class |
|---|---|---|
| Sage (primary) | `#4B6B4F` | `bg-sage`, `text-sage-dark` |
| Sandstone (background) | `#F1E9DD` | `bg-sandstone` |
| Terracotta (accent/CTA) | `#B5602E` | `bg-terracotta` |
| Gold (highlight) | `#C9A961` | `text-gold`, `bg-gold` |
| Charcoal (text) | `#2E2B24` | `text-charcoal` |

Fonts: `font-display` (Fraunces, headings) and the default `font-sans`
(Inter, body/UI) — both configured in `tailwind.config.ts`.

## 5. Project structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fonts, Header, Footer, ChatWidget
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css
│   │   ├── category/[slug]/    # Category listing page
│   │   ├── product/[slug]/     # Product detail page
│   │   ├── cart/                # Cart page
│   │   ├── checkout/            # Checkout page
│   │   ├── vendor/apply/        # Vendor onboarding form
│   │   └── about/               # About/brand story page
│   ├── components/
│   │   ├── Header.tsx           # Responsive nav + mobile menu
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx             # Homepage hero, signature scalloped-trim motif
│   │   ├── FestivalStrip.tsx    # Festival collection cards
│   │   ├── CategoryGrid.tsx     # Icon-based category tiles (react-icons/gi)
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ArtisanSpotlight.tsx # "Meet the maker" storytelling section
│   │   └── ChatWidget.tsx       # Floating chatbot, calls /api/chatbot
│   ├── lib/
│   │   ├── api.ts               # Typed fetch helper for the FastAPI backend
│   │   └── sample-data.ts       # Placeholder data used until backend is wired up
│   └── types/
│       └── index.ts
├── public/images/                # Hand-coded SVG festival banners (no AI images)
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

## 6. What's next

- Wire real data via `apiFetch` (replace `sample-data.ts` usage)
- Add auth pages (login/signup) calling `/api/auth/login` and `/api/auth/signup`
- Add the admin panel as a second Next.js app (or a role-gated route group) hitting the same backend
- Replace placeholder gallery blocks on the product page with real Cloudinary images
- Add loading/empty states once data is live instead of static sample arrays
