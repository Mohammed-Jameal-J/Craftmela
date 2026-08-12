export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  stock: number;
  images: string[];
  rating_avg: number;
  vendor_id: string;
  category_id: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface FestivalCollection {
  title: string;
  slug: string;
  bannerImage: string;
  tagline: string;
}
