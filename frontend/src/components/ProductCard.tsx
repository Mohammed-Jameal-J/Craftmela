"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiStar } from "react-icons/fi";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const image = product.images[0];
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-card bg-sandstone-dark">
          {image ? (
            <Image
              src={image}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sandstone-dark to-sage/20">
              <span className="font-display text-sm text-charcoal-light/50">CraftMela</span>
            </div>
          )}

          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded-full bg-terracotta px-2.5 py-1 text-xs font-medium text-sandstone-light">
              Sale
            </span>
          )}

          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-colors hover:text-terracotta ${
              wishlisted ? "text-terracotta" : "text-charcoal"
            }`}
          >
            <FiHeart className={`h-4 w-4 ${wishlisted ? "fill-terracotta" : ""}`} />
          </button>
        </div>

        <div className="mt-3">
          <h3 className="line-clamp-1 text-sm font-medium text-charcoal">{product.title}</h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-charcoal-light">
            <FiStar className="h-3.5 w-3.5 fill-gold text-gold" />
            <span>{product.rating_avg.toFixed(1)}</span>
          </div>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-sm font-medium text-charcoal">₹{product.price.toLocaleString("en-IN")}</span>
            {hasDiscount && (
              <span className="text-xs text-charcoal-light/60 line-through">
                ₹{product.compare_at_price!.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
