"use client";

import { FiCheckCircle } from "react-icons/fi";

export default function VendorApplyPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-3xl text-charcoal">Sell your craft on CraftMela</h1>
        <p className="mt-3 text-sm text-charcoal-light">
          Join a marketplace built for artisans, not mass sellers. Tell us
          about your craft and we&apos;ll review your application within 2–3
          business days.
        </p>

        <ul className="mt-6 space-y-2 text-sm text-charcoal-light">
          <li className="flex items-center gap-2">
            <FiCheckCircle className="h-4 w-4 text-sage-dark" /> No listing fees to apply
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle className="h-4 w-4 text-sage-dark" /> Transparent commission, paid on delivery
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle className="h-4 w-4 text-sage-dark" /> A public artisan profile page to tell your story
          </li>
        </ul>

        <form className="mt-8 space-y-4 rounded-card border border-sage/10 bg-white p-6">
          <input placeholder="Business / workshop name" className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
          <input placeholder="Your name" className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
          <input placeholder="Email" type="email" className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
          <input placeholder="Region / city" className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
          <textarea placeholder="Tell us about your craft" rows={4} className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm outline-none focus:border-sage" />
          <button type="submit" className="w-full rounded-full bg-sage-dark py-3 text-sm font-medium text-sandstone-light hover:bg-sage">
            Submit application
          </button>
        </form>
      </div>
    </div>
  );
}
