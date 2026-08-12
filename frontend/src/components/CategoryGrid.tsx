import Link from "next/link";
import { Home, Gem, Flame, Shirt, Image, Gift } from "lucide-react";
import { Category } from "@/types";

// Maps category slug -> icon. Swap freely for any icon in lucide-react.
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "home-decor": Home,
  jewelry: Gem,
  "puja-essentials": Flame,
  textiles: Shirt,
  "wall-art": Image,
  gifting: Gift,
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="container-page py-12">
      <h2 className="mb-6 text-2xl text-charcoal sm:text-3xl">Shop by category</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.slug] ?? Home;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-card border border-sage/10 bg-white px-3 py-5 text-center transition-colors hover:border-sage/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-colors group-hover:bg-sage/20">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-medium text-charcoal-light">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
