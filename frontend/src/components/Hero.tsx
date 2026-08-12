"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const FEATURED_CRAFTS = [
  { craft: "Blue Pottery", place: "Jaipur, Rajasthan" },
  { craft: "Dhokra Brass Casting", place: "Odisha" },
  { craft: "Madhubani Painting", place: "Mithila, Bihar" },
  { craft: "Bandhani Tie-Dye", place: "Kutch, Gujarat" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED_CRAFTS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const featured = FEATURED_CRAFTS[index];

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
          <div className="absolute inset-0 flex translate-x-2 -translate-y-2 rotate-1 items-center justify-center rounded-t-card bg-sandstone-light p-8 text-center">
            <div key={index} className="animate-fade-in">
              <p className="font-display text-lg text-sage-dark">This week&apos;s craft</p>
              <p className="mt-1 font-display text-3xl text-charcoal">{featured.craft}</p>
              <p className="mt-2 text-sm text-charcoal-light">{featured.place}</p>
            </div>

            {/* Scalloped trim, drawn as SVG path — a recurring device used across
                banners/section dividers instead of a generic gradient blob.
                Nested inside the front card (not the outer stack) so it shares
                the card's transform and sits flush against its edge. */}
            <svg
              className="absolute inset-x-0 top-full h-4 w-full text-sandstone-light"
              viewBox="0 0 400 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 0 Q10 16 20 0 Q30 16 40 0 Q50 16 60 0 Q70 16 80 0 Q90 16 100 0 Q110 16 120 0 Q130 16 140 0 Q150 16 160 0 Q170 16 180 0 Q190 16 200 0 Q210 16 220 0 Q230 16 240 0 Q250 16 260 0 Q270 16 280 0 Q290 16 300 0 Q310 16 320 0 Q330 16 340 0 Q350 16 360 0 Q370 16 380 0 Q390 16 400 0 L400 0 L0 0 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
