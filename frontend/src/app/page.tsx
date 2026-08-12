import Hero from "@/components/Hero";
import FestivalStrip from "@/components/FestivalStrip";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import ArtisanSpotlight from "@/components/ArtisanSpotlight";
import { festivalCollections, sampleCategories, sampleProducts } from "@/lib/sample-data";

// NOTE: replace sample-data imports with apiFetch() calls to the FastAPI
// backend (/api/products, /api/categories) once it's running.
export default function HomePage() {
  return (
    <>
      <Hero />
      <FestivalStrip collections={festivalCollections} />
      <CategoryGrid categories={sampleCategories} />
      <ProductGrid
        title="Trending this week"
        subtitle="Handpicked by our curators"
        products={sampleProducts}
      />
      <ArtisanSpotlight />
      <ProductGrid
        title="New arrivals"
        products={[...sampleProducts].reverse()}
      />
    </>
  );
}
