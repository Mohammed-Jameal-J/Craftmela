"use client";

import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="mb-3 font-display text-3xl text-charcoal">Your cart is empty</h1>
        <p className="mb-6 text-sm text-charcoal-light">
          Browse the marketplace and add something handcrafted.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-sandstone-light hover:bg-terracotta-light"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 font-display text-3xl text-charcoal">Your cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-card border border-sage/10 bg-white p-4"
            >
              <div className="h-20 w-20 shrink-0 rounded-lg bg-sandstone-dark" />
              <div className="flex-1">
                <p className="text-sm font-medium text-charcoal">{product.title}</p>
                <p className="mt-1 text-sm text-charcoal-light">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                    className="w-16 rounded-lg border border-sage/20 px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                aria-label="Remove item"
                onClick={() => removeFromCart(product.id)}
                className="text-charcoal-light hover:text-error"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-card border border-sage/10 bg-white p-6">
          <h2 className="font-display text-lg text-charcoal">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm text-charcoal-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-sage/10 pt-4 text-sm font-medium text-charcoal">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-terracotta py-3 text-center text-sm font-medium text-sandstone-light hover:bg-terracotta-light"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
