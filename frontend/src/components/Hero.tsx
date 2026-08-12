"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

// Drop matching photos into /public/images with these exact filenames
// (jpg/png/webp all fine, just keep the name) and each card will pick them up.
const FEATURED_CRAFTS = [
  { craft: "Blue Pottery", place: "Jaipur, Rajasthan", image: "/images/craft-blue-pottery.jpg" },
  { craft: "Dhokra Brass Casting", place: "Odisha", image: "/images/craft-dhokra-brass.jpg" },
  { craft: "Madhubani Painting", place: "Mithila, Bihar", image: "/images/craft-madhubani.jpg" },
  { craft: "Bandhani Tie-Dye", place: "Kutch, Gujarat", image: "/images/craft-bandhani.jpg" },
];

const ROTATE_MS = 7000;

// Fallback tint shown behind each photo until the real image file exists —
// keeps the swap looking finished instead of a broken-image icon.
const FALLBACK_TINTS = ["bg-terracotta-dark", "bg-brown", "bg-gold-dark", "bg-charcoal-light"];

// Scallop trim color per slide — kept in step with FALLBACK_TINTS above so
// the bottom edge always reads as "this card's color", not a fixed white strip.
const TINT_TEXT_CLASSES = ["text-terracotta-dark", "text-brown", "text-gold-dark", "text-charcoal-light"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED_CRAFTS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

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

        {/* Signature element: layered craft "stall" collage — a rotating photo
            card (new background image + caption every 7s) tied together by a
            hand-drawn scalloped trim motif rather than a stock product grid */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <div className="absolute inset-0 rotate-2 rounded-card bg-terracotta/90" />
          <div className="absolute inset-0 -rotate-3 translate-x-4 translate-y-3 rounded-card bg-gold/80" />

          <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-1">
            <div className="relative h-full w-full overflow-hidden rounded-t-card bg-sandstone-light">
              {FEATURED_CRAFTS.map((item, i) => {
                const isActive = i === index;
                return (
                  <div
                    key={item.craft}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${FALLBACK_TINTS[i % FALLBACK_TINTS.length]}`}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(28px)",
                      zIndex: isActive ? 10 : 0,
                    }}
                    aria-hidden={!isActive}
                  >
                    {!brokenImages[i] && (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 400px, 90vw"
                        className="object-cover"
                        priority={i === 0}
                        onError={() => setBrokenImages((prev) => ({ ...prev, [i]: true }))}
                      />
                    )}
                    <div className="absolute inset-0 bg-charcoal/40" />
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                      <div>
                        <p className="font-display text-lg text-sandstone-light">
                          This week&apos;s craft
                        </p>
                        <p className="mt-1 font-display text-3xl text-sandstone-light">
                          {item.craft}
                        </p>
                        <p className="mt-2 text-sm text-sandstone-light/85">{item.place}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scalloped trim, drawn as SVG path — a recurring device used across
                banners/section dividers instead of a generic gradient blob.
                Shares the card's transform via the wrapper above, so it sits
                flush against the card's edge regardless of which slide is showing.
                Its color tracks the active slide's tint via currentColor. */}
            <svg
              className={`absolute inset-x-0 top-full h-4 w-full transition-colors duration-700 ease-in-out ${TINT_TEXT_CLASSES[index % TINT_TEXT_CLASSES.length]}`}
              viewBox="0 0 400 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 0 Q10 16 20 0 Q30 16 40 0 Q50 16 60 0 Q70 16 80 0 Q90 16 100 0 Q110 16 120 0 Q130 16 140 0 Q150 16 160 0 Q170 16 180 0 Q190 16 200 0 Q210 16 220 0 Q230 16 240 0 Q250 16 260 0 Q270 16 280 0 Q290 16 300 0 Q310 16 320 0 Q330 16 340 0 Q350 16 360 0 Q370 16 380 0 Q390 16 400 0 L400 0 L0 0 Z"
                fill="currentColor"
              />
            </svg>

            {/* Slide indicators */}
            <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-1.5">
              {FEATURED_CRAFTS.map((item, i) => (
                <span
                  key={item.craft}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-sandstone-light" : "w-1.5 bg-sandstone-light/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
