import { Link } from "react-router-dom";
import { ProductImage } from "@/components/ProductImage";
import { useSelector } from "react-redux";
import { type TRootState } from "@/lib/store";
import { TProductRelatedProps } from "./ProductRelated.types";

function ProductRelated({ relatedProducts }: TProductRelatedProps) {
  const { locale, currency } = useSelector((state: TRootState) => state.config);
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Related Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {relatedProducts.map((relatedProduct) => (
          <Link
            key={relatedProduct.id}
            to={`/product/${relatedProduct.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <ProductImage
              src={relatedProduct.thumbnail}
              alt={relatedProduct.title}
              className="w-full h-32 object-contain bg-white"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {relatedProduct.title}
              </h3>
              <p className="text-gray-600 mt-1">
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: currency,
                }).format(relatedProduct.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductRelated;
