import { memo } from "react";
import { ProductImage } from "@/components/ProductImage";
import { type TProductImageGalleryProps } from "./ProductImageGallery.types";

const ProductImageGallery = memo(
  ({ product, selectedImage, setSelectedImage }: TProductImageGalleryProps) => (
    <div className="space-y-4">
      <ProductImage
        src={selectedImage || product.thumbnail}
        alt={product.title}
        className="w-full h-96 object-contain rounded-lg"
      />
      <div className="grid grid-cols-4 gap-2">
        {product.images.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`focus:outline-none ${
              selectedImage === image ? "ring-2 ring-teal-500" : ""
            }`}
          >
            <ProductImage
              src={image}
              alt={`${product.title} ${index + 1}`}
              className="w-full h-20 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  )
);

export default ProductImageGallery;
