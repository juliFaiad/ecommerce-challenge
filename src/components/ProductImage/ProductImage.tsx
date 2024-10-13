import { useState } from "react";
import type { TProductImageProps } from "./ProductImage.types";
import clsx from "clsx";

function ProductImage({ src, alt, className }: TProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div
          className={clsx(
            "absolute inset-0 bg-gray-200 animate-pulse",
            className
          )}
        ></div>
      )}
      <img
        src={src}
        alt={alt}
        className={clsx(
          "transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

export default ProductImage;
