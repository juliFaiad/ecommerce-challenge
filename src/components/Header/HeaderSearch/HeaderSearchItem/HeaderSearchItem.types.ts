import { TProduct } from "@/lib/service/product";

export type THeaderSearchItemProps = {
  product: TProduct;
  setInputValue: (value: string) => void;
};
