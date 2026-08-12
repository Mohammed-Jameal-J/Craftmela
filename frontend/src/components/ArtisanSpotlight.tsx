import Link from "next/link";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

export default function ArtisanSpotlight() {
  return (
    <section className="bg-sandstone-dark/60 py-16">
      <div className="container-page grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="text-sm font-medium uppercase tracking-widest text-terracotta">
            Meet the maker
          </p>
          <h2 className="mt-3 font-display text-3xl text-charcoal">
            Radha Devi has been shaping clay for 32 years
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal-light">
            In a small workshop outside Jaipur, Radha and her family hand-throw
            and paint every piece of blue pottery sold on CraftMela. No two
            pieces are identical — and that&apos;s the point.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-charcoal-light/70">
            <FiMapPin className="h-3.5 w-3.5" />
            Jaipur, Rajasthan
          </div>
          <Link
            href="/artisan/radha-devi"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sage-dark hover:underline"
          >
            Shop Radha&apos;s collection <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="order-1 aspect-[4/3] w-full rounded-card bg-gradient-to-br from-sage/30 via-sandstone-dark to-terracotta/20 md:order-2" />
      </div>
    </section>
  );
}
