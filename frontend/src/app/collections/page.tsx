import Image from "next/image";
import Link from "next/link";
import { festivalCollections } from "@/lib/sample-data";

export default function CollectionsPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-8 font-display text-3xl text-charcoal">Shop by celebration</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {festivalCollections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group relative overflow-hidden rounded-card"
          >
            <div className="relative h-56 w-full">
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
    </div>
  );
}
