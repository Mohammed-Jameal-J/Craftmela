import Link from "next/link";
import { FiInstagram, FiFacebook, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sage/15 bg-charcoal text-sandstone-light">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-xl font-semibold text-gold">CraftMela</p>
          <p className="mt-3 max-w-xs text-sm text-sandstone/70">
            Handcrafted festival, faith, and celebration products — sourced directly from artisans across India.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" aria-label="Instagram" className="text-sandstone/70 hover:text-gold">
              <FiInstagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-sandstone/70 hover:text-gold">
              <FiFacebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Email" className="text-sandstone/70 hover:text-gold">
              <FiMail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-sandstone-light">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-sandstone/70">
            <li><Link href="/category/home-decor" className="hover:text-gold">Home decor</Link></li>
            <li><Link href="/category/jewelry" className="hover:text-gold">Jewelry</Link></li>
            <li><Link href="/category/textiles" className="hover:text-gold">Textiles</Link></li>
            <li><Link href="/category/gifting" className="hover:text-gold">Gifting</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-sandstone-light">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-sandstone/70">
            <li><Link href="/about" className="hover:text-gold">Our artisans</Link></li>
            <li><Link href="/vendor/apply" className="hover:text-gold">Sell on CraftMela</Link></li>
            <li><Link href="/help" className="hover:text-gold">Shipping & returns</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-sandstone-light">Get festival updates</p>
          <p className="mt-3 text-sm text-sandstone/70">New collections, before everyone else.</p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-full border border-sandstone/20 bg-transparent px-4 py-2 text-sm text-sandstone-light placeholder:text-sandstone/40 outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold px-4 py-2 text-sm font-medium text-charcoal hover:bg-gold-light"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-sandstone/10 py-5">
        <p className="container-page text-center text-xs text-sandstone/50">
          © {new Date().getFullYear()} CraftMela. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
