export type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type TProductsState = {
  items: TProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
};

export type TFilters = {
  category?: string;
};

export type TSortOption = {
  field: string;
  order: "asc" | "desc" | null;
};

export type TCategory = {
  name: string;
  slug: string;
  url: string;
};
