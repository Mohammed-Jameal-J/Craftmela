import ProductGrid from "@/components/ProductGrid";
import { sampleProducts } from "@/lib/sample-data";

export default function ShopPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-2 font-display text-3xl text-charcoal">Shop everything</h1>
      <p className="mb-8 text-sm text-charcoal-light">
        Every handcrafted piece across CraftMela, in one place.
      </p>
      <ProductGrid title="" products={sampleProducts} />
    </div>
  );
}
