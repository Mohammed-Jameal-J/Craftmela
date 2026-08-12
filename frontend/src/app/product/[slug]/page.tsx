"use client";

import { useState } from "react";
import { FiCheck, FiHeart, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import { sampleProducts } from "@/lib/sample-data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = sampleProducts.find((p) => p.slug === params.slug) ?? sampleProducts[0];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="container-page py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-card bg-gradient-to-br from-sandstone-dark to-sage/15" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-card bg-sandstone-dark" />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-3xl text-charcoal">{product.title}</h1>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-charcoal-light">
            <FiStar className="h-4 w-4 fill-gold text-gold" />
            {product.rating_avg.toFixed(1)} · Handcrafted by verified artisan
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium text-charcoal">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-base text-charcoal-light/60 line-through">
                ₹{product.compare_at_price!.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal-light">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-sage-dark">
            <FiTruck className="h-4 w-4" />
            Ships in 3–5 days · Free shipping over ₹999
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-sandstone-light transition-colors hover:bg-terracotta-light"
            >
              {justAdded ? (
                <>
                  <FiCheck className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <FiShoppingBag className="h-4 w-4" /> Add to cart
                </>
              )}
            </button>
            <button
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWishlist(product.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                wishlisted
                  ? "border-terracotta text-terracotta"
                  : "border-sage/25 text-charcoal hover:text-terracotta"
              }`}
            >
              <FiHeart className={`h-5 w-5 ${wishlisted ? "fill-terracotta" : ""}`} />
            </button>
          </div>

          <p className="mt-4 text-xs text-charcoal-light/60">
            Only {product.stock} left in stock
          </p>
        </div>
      </div>
    </div>
  );
}
