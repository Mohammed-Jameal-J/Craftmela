"use client";

import { FiCreditCard, FiMapPin } from "react-icons/fi";
import { sampleProducts } from "@/lib/sample-data";

export default function CheckoutPage() {
  const items = sampleProducts.slice(0, 2);
  const subtotal = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 font-display text-3xl text-charcoal">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-card border border-sage/10 bg-white p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-charcoal">
              <FiMapPin className="h-4 w-4 text-sage-dark" /> Shipping address
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input placeholder="Full name" className="rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
              <input placeholder="Phone number" className="rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
              <input placeholder="Address line 1" className="sm:col-span-2 rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
              <input placeholder="City" className="rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
              <input placeholder="Pincode" className="rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
            </div>
          </div>

          <div className="rounded-card border border-sage/10 bg-white p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-charcoal">
              <FiCreditCard className="h-4 w-4 text-sage-dark" /> Payment
            </div>
            <p className="text-sm text-charcoal-light">
              Handled via Razorpay/Stripe at checkout confirmation — no card details are stored on CraftMela.
            </p>
          </div>
        </div>

        <div className="h-fit rounded-card border border-sage/10 bg-white p-6">
          <h2 className="font-display text-lg text-charcoal">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((p) => (
              <div key={p.id} className="flex justify-between text-sm text-charcoal-light">
                <span className="line-clamp-1">{p.title}</span>
                <span>₹{p.price.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-sage/10 pt-4 text-sm font-medium text-charcoal">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <button className="mt-6 w-full rounded-full bg-terracotta py-3 text-sm font-medium text-sandstone-light hover:bg-terracotta-light">
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}
