import Link from "next/link";

export default function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-terracotta">Coming soon</p>
      <h1 className="mt-3 font-display text-4xl text-charcoal">{title}</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-charcoal-light">
        {description}
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-sandstone-light hover:bg-terracotta-light"
      >
        Browse the shop instead
      </Link>
    </div>
  );
}
