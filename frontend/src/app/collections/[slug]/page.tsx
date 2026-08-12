import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import { festivalCollections, sampleProducts } from "@/lib/sample-data";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = festivalCollections.find((c) => c.slug === params.slug);

  return (
    <div>
      <div className="relative h-56 w-full sm:h-72">
        {collection && (
          <Image
            src={collection.bannerImage}
            alt={collection.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="container-page absolute inset-0 flex flex-col justify-end pb-8">
          <h1 className="font-display text-3xl text-sandstone-light sm:text-4xl">
            {collection?.title ?? "Collection"}
          </h1>
          {collection && <p className="mt-1 text-sandstone-light/85">{collection.tagline}</p>}
        </div>
      </div>

      <ProductGrid title="" products={sampleProducts} />
    </div>
  );
}
