import { type TProduct } from "@/lib/service/product";
import { Dispatch, SetStateAction } from "react";

export type TProductImageGalleryProps = {
  product: TProduct;
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
};
