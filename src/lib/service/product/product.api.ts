import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import buildUrl from "@/lib/utils/buildUrl";
import type { TProduct, TSortOption, TCategory } from "./product.types";

// TODO: find more elegant way to handle constants
const ENDPOINTS = {
  PRODUCTS: "products",
  CATEGORY: "/products/category",
  CATEGORIES: "/products/categories",
  SEARCH: "/products/search",
};

const LIMITS = {
  RELATED_PRODUCTS: 5,
  PRODUCTS_PER_PAGE: 12,
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: TProduct[]; total: number },
      { sort?: TSortOption; page?: number; slug?: string }
    >({
      query: ({ sort, page = 1, slug }) => ({
        url: slug ? `${ENDPOINTS.CATEGORY}/${slug}` : ENDPOINTS.PRODUCTS,
        params: {
          sortBy: sort?.order && sort?.field ? sort.field : undefined,
          order: sort?.order && sort?.field ? sort.order : undefined,
          limit: LIMITS.PRODUCTS_PER_PAGE,
          skip: (page - 1) * LIMITS.PRODUCTS_PER_PAGE,
        },
      }),
      transformResponse: (response: { products: TProduct[]; total: number }) =>
        response,
    }),
    getProductDetails: builder.query<TProduct, string>({
      query: (id) => buildUrl(`${ENDPOINTS.PRODUCTS}/${id}`, {}),
    }),
    getRelatedProducts: builder.query<
      TProduct[],
      { id: string; category: string }
    >({
      query: ({ category }) =>
        buildUrl(`${ENDPOINTS.CATEGORY}/${category}`, {
          limit: LIMITS.RELATED_PRODUCTS + 1,
        }),
      transformResponse: (response: { products: TProduct[] }, _, { id }) =>
        response.products.filter((p) => p.id.toString() !== id),
    }),
    searchProducts: builder.query<TProduct[], string>({
      query: (query) => ({
        url: ENDPOINTS.SEARCH,
        params: { q: query },
      }),
      transformResponse: (response: { products: TProduct[] }) =>
        response.products,
    }),
    getCategories: builder.query<TCategory[], void>({
      query: () => buildUrl(ENDPOINTS.CATEGORIES, {}),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetRelatedProductsQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
} = productApi;

export { LIMITS };
