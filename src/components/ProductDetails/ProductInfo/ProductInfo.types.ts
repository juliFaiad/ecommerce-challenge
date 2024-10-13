import { type TProduct } from "@/lib/service/product";

export type TProductInfoProps = {
  product: TProduct;
  locale: string;
  currency: string;
};
