import { Product } from "@/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section className="container-page py-12">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl text-charcoal sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-charcoal-light">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
