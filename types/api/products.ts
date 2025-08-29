export interface Category {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
}

export interface Image {
  id: number;
  image_url: string;
  order: number;
}

export interface Product {
  id: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  category: Category;
  main_image: string;
  hovered_image: string;
  is_customizable: boolean;
  min_digits: number | null;
  max_digits: number | null;
  pricing_type: string;
  base_price: number | null;
  min_price: string;
  max_price: string;
  currency: string;
  images: Image[];
  created_at: string;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
