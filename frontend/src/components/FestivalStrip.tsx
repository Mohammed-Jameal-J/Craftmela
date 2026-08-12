import Image from "next/image";
import Link from "next/link";
import { FestivalCollection } from "@/types";

export default function FestivalStrip({ collections }: { collections: FestivalCollection[] }) {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl text-charcoal sm:text-3xl">Shop by celebration</h2>
        <Link href="/collections" className="text-sm font-medium text-sage-dark hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group relative overflow-hidden rounded-card"
          >
            <div className="relative h-48 w-full">
              <Image
                src={c.bannerImage}
                alt={c.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/20" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-xl text-sandstone-light">{c.title}</p>
              <p className="text-sm text-sandstone-light/85">{c.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
