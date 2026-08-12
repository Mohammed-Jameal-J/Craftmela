import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sage-dark">
      <div className="container-page grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold">
            Festival · Faith · Celebration
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-sandstone-light sm:text-5xl">
            Handcrafted treasures, made by artisans who still remember why.
          </h1>
          <p className="mt-5 max-w-md text-base text-sandstone-light/80">
            Every diya, dupatta, and figurine here is made by hand, by a named
            artisan, in a real workshop — not a warehouse. Shop pieces with
            an actual story behind them.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/category/home-decor"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-sandstone-light transition-colors hover:bg-terracotta-light"
            >
              Shop the collection <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-sandstone-light/30 px-6 py-3 text-sm font-medium text-sandstone-light transition-colors hover:bg-white/5"
            >
              Meet the artisans
            </Link>
          </div>
        </div>

        {/* Signature element: layered craft "stall" collage, tied together by a
            hand-drawn scalloped trim motif rather than a stock product photo grid */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <div className="absolute inset-0 rotate-2 rounded-card bg-terracotta/90" />
          <div className="absolute inset-0 -rotate-3 translate-x-4 translate-y-3 rounded-card bg-gold/80" />
          <div className="absolute inset-0 flex translate-x-2 -translate-y-2 rotate-1 items-center justify-center rounded-card bg-sandstone-light p-8 text-center">
            <div>
              <p className="font-display text-lg text-sage-dark">This week&apos;s craft</p>
              <p className="mt-1 font-display text-3xl text-charcoal">Blue Pottery</p>
              <p className="mt-2 text-sm text-charcoal-light">Jaipur, Rajasthan</p>
            </div>
          </div>

          {/* Scalloped trim, drawn as SVG path — a recurring device used across
              banners/section dividers instead of a generic gradient blob */}
          <svg
            className="absolute -bottom-6 left-1/2 h-6 w-[110%] -translate-x-1/2 text-sandstone"
            viewBox="0 0 400 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 0 Q10 24 20 0 Q30 24 40 0 Q50 24 60 0 Q70 24 80 0 Q90 24 100 0 Q110 24 120 0 Q130 24 140 0 Q150 24 160 0 Q170 24 180 0 Q190 24 200 0 Q210 24 220 0 Q230 24 240 0 Q250 24 260 0 Q270 24 280 0 Q290 24 300 0 Q310 24 320 0 Q330 24 340 0 Q350 24 360 0 Q370 24 380 0 Q390 24 400 0 L400 0 L0 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
