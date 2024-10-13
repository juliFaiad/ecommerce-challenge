import { type TProduct } from "@/lib/service/product";

export type TCartItem = {
  quantity: number;
} & TProduct;

export type TCartState = {
  items: TCartItem[];
  isOpen: boolean;
};
