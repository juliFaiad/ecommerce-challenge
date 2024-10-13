import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/store/cartSlice";
import {
  useGetProductDetailsQuery,
  useGetRelatedProductsQuery,
} from "@/lib/service/product";
import { useState } from "react";
import { ProductRelated } from "./ProductRelated";
import { type TRootState } from "@/lib/store";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";

function ProductDetails() {
  const { id = "" } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { locale, currency } = useSelector((state: TRootState) => state.config);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  const { data: relatedProducts = [] } = useGetRelatedProductsQuery(
    { id, category: product?.category ?? "" },
    { skip: !product }
  );

  // reset selectedImage when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);
  const addToCartHandler = useCallback(() => {
    if (product) {
      dispatch(addToCart(product));
    }
  }, [dispatch, product]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500">
        {error ? "Error loading product" : "Product not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageGallery
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <div>
          <ProductInfo product={product} locale={locale} currency={currency} />
          <button
            onClick={addToCartHandler}
            className="w-full bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition duration-300 flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductRelated relatedProducts={relatedProducts} />
      )}
    </div>
  );
}

export default ProductDetails;
