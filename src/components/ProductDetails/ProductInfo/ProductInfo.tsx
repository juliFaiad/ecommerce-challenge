import { Star } from "lucide-react";
import { memo } from "react";
import { type TProductInfoProps } from "./ProductInfo.types";

const ProductInfo = memo(({ product, locale, currency }: TProductInfoProps) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
    <p className="text-gray-600 mb-4">{product.description}</p>
    <div className="flex items-center mb-4">
      <Star className="text-yellow-400" size={20} />
      <span className="ml-1 text-lg font-semibold">
        {product.rating.toFixed(1)}
      </span>
    </div>
    <p className="text-2xl font-bold text-gray-800 mb-4">
      {new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(product.price)}
    </p>
  </div>
));

export default ProductInfo;
