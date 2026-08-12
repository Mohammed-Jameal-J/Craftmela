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
  FiChevronDown,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { sampleCategories, festivalCollections } from "@/lib/sample-data";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const NAV_LINKS: NavLink[] = [
  {
    label: "Shop",
    href: "/shop",
    dropdown: sampleCategories.map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
  },
  {
    label: "Festivals",
    href: "/collections",
    dropdown: festivalCollections.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })),
  },
  { label: "Life Moments", href: "/life-moments" },
  { label: "Weddings", href: "/weddings" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Custom Studio", href: "/custom-studio" },
];

const ARTISANS_LINK: NavLink = { label: "Artisans", href: "/about" };

function MandalaLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0 text-terracotta" aria-hidden="true">
      <g fill="currentColor">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="16"
            cy="8"
            rx="3"
            ry="7"
            transform={`rotate(${i * 45} 16 16)`}
            opacity="0.85"
          />
        ))}
      </g>
      <circle cx="16" cy="16" r="3.5" fill="#F1E9DD" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { productIds } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-sage/15 bg-sandstone-light/95 backdrop-blur">
      {/* Top bar */}
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <MandalaLogo />
          <span className="font-display text-2xl font-semibold">
            <span className="text-charcoal">Craft</span>
            <span className="text-terracotta">Mela</span>
          </span>
        </Link>

        {/* Desktop search */}
        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-full bg-sandstone-dark/60 px-4 py-2.5">
            <FiSearch className="h-4 w-4 text-charcoal-light" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search handcrafted treasures..."
              className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal-light/70 outline-none"
            />
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/vendor/apply"
            className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-sandstone-light transition-colors hover:bg-terracotta-light"
          >
            Sell on CraftMela
          </Link>
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="relative flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors"
          >
            <span className="relative">
              <FiHeart className="h-5 w-5" />
              {productIds.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-medium text-sandstone-light">
                  {productIds.length}
                </span>
              )}
            </span>
            <span className="text-[11px]">Wishlist</span>
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors"
          >
            <span className="relative">
              <FiShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-medium text-sandstone-light">
                  {itemCount}
                </span>
              )}
            </span>
            <span className="text-[11px]">Cart</span>
          </Link>
          <Link
            href="/account/orders"
            aria-label="Account"
            className="flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors"
          >
            <FiUser className="h-5 w-5" />
            <span className="text-[11px]">Profile</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="ml-auto text-charcoal md:hidden"
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
            <div key={link.href} className="group relative h-full flex items-center">
              <Link
                href={link.href}
                className="flex items-center gap-1 text-charcoal-light transition-colors hover:text-sage-dark"
              >
                {link.label}
                {link.dropdown && <FiChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {link.dropdown && (
                <div className="invisible absolute left-0 top-full z-50 min-w-[180px] rounded-lg border border-sage/10 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-charcoal-light hover:bg-sandstone-light hover:text-sage-dark"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <span className="h-5 w-px bg-sage/20" aria-hidden="true" />

          <Link
            href={ARTISANS_LINK.href}
            className="font-medium text-terracotta transition-colors hover:text-terracotta-light"
          >
            {ARTISANS_LINK.label}
          </Link>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-sage/15 bg-sandstone-light md:hidden">
          <div className="container-page flex items-center gap-2 rounded-full bg-sandstone-dark/60 px-4 py-2 my-3">
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
            <Link
              href={ARTISANS_LINK.href}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-terracotta hover:bg-white"
              onClick={() => setMenuOpen(false)}
            >
              {ARTISANS_LINK.label}
            </Link>
            <Link
              href="/vendor/apply"
              className="mt-2 rounded-full bg-terracotta px-4 py-2.5 text-center text-sm font-medium text-sandstone-light"
              onClick={() => setMenuOpen(false)}
            >
              Sell on CraftMela
            </Link>
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
