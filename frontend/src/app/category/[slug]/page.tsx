import ProductGrid from "@/components/ProductGrid";
import { sampleCategories, sampleProducts } from "@/lib/sample-data";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = sampleCategories.find((c) => c.slug === params.slug);
  const products = sampleProducts.filter((p) => p.category_id === category?.id);

  return (
    <div className="container-page py-10">
      <nav className="mb-2 text-xs text-charcoal-light/70">
        Home / <span className="text-charcoal">{category?.name ?? params.slug}</span>
      </nav>
      <h1 className="mb-8 font-display text-3xl text-charcoal">
        {category?.name ?? "Category"}
      </h1>

      {products.length > 0 ? (
        <ProductGrid title="" products={products} />
      ) : (
        <p className="text-sm text-charcoal-light">
          No products in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
