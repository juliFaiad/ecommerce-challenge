import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { addToCart } from "@/lib/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { type TRootState } from "@/lib/store";
import { type TProductListCardProps } from "./ProductListCard.types";
import { memo } from "react";

const ProductListCard = memo(({ product }: TProductListCardProps) => {
  const dispatch = useDispatch();
  const { locale, currency } = useSelector((state: TRootState) => state.config);

  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-contain bg-white"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/product/${product.id}`}
          className="text-lg font-semibold text-gray-800 hover:text-teal-600 line-clamp-1"
        >
          {product.title}
        </Link>
        <p className="text-gray-600 mt-2">
          {new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
          }).format(product.price)}
        </p>
        <div className="flex items-center mt-2">
          <Star className="text-yellow-400" size={16} />
          <span className="ml-1 text-sm text-gray-600">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300 flex items-center justify-center"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default ProductListCard;
