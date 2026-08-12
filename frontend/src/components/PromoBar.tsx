"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function PromoBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-brown text-sandstone-light">
      <div className="container-page flex h-9 items-center justify-center px-10 text-center text-xs font-medium sm:text-sm">
        <p>Free shipping on orders over ₹999 · Use code CRAFT10 for 10% off your first order</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss promotional banner"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sandstone-light/80 hover:text-sandstone-light"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}
