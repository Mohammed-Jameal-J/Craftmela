"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const NAV_LINKS = [
  { label: "Home decor", href: "/category/home-decor" },
  { label: "Jewelry", href: "/category/jewelry" },
  { label: "Puja essentials", href: "/category/puja-essentials" },
  { label: "Textiles", href: "/category/textiles" },
  { label: "Gifting", href: "/category/gifting" },
  { label: "Our artisans", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { productIds } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-sage/15 bg-sandstone-light/95 backdrop-blur">
      {/* Top bar */}
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-2xl font-semibold text-sage-dark shrink-0">
          CraftMela
        </Link>

        {/* Desktop search */}
        <div className="hidden flex-1 max-w-md items-center gap-2 rounded-full border border-sage/25 bg-white px-4 py-2 md:flex">
          <FiSearch className="h-4 w-4 text-charcoal-light" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search for diyas, sarees, gifts..."
            className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal-light/70 outline-none"
          />
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/account/wishlist" aria-label="Wishlist" className="relative text-charcoal hover:text-terracotta transition-colors">
            <FiHeart className="h-5 w-5" />
            {productIds.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-medium text-sandstone-light">
                {productIds.length}
              </span>
            )}
          </Link>
          <Link href="/account/orders" aria-label="Account" className="text-charcoal hover:text-terracotta transition-colors">
            <FiUser className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative text-charcoal hover:text-terracotta transition-colors">
            <FiShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-medium text-sandstone-light">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-charcoal md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop nav row */}
      <nav className="hidden border-t border-sage/10 md:block">
        <div className="container-page flex h-11 items-center gap-7 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-charcoal-light transition-colors hover:text-sage-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-sage/15 bg-sandstone-light md:hidden">
          <div className="container-page flex items-center gap-2 rounded-full border border-sage/25 bg-white px-4 py-2 my-3">
            <FiSearch className="h-4 w-4 text-charcoal-light" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal-light/70"
            />
          </div>
          <div className="container-page flex flex-col gap-1 pb-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2.5 text-sm text-charcoal-light hover:bg-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-6 border-t border-sage/10 px-2 pt-3">
              <Link href="/account/wishlist" className="flex items-center gap-2 text-sm text-charcoal">
                <FiHeart className="h-4 w-4" /> Wishlist{productIds.length > 0 ? ` (${productIds.length})` : ""}
              </Link>
              <Link href="/account/orders" className="flex items-center gap-2 text-sm text-charcoal">
                <FiUser className="h-4 w-4" /> Account
              </Link>
              <Link href="/cart" className="flex items-center gap-2 text-sm text-charcoal">
                <FiShoppingBag className="h-4 w-4" /> Cart{itemCount > 0 ? ` (${itemCount})` : ""}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
