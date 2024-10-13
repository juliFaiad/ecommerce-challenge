import { Link } from "react-router-dom";
import { TRootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { type THeaderSearchItemProps } from "./HeaderSearchItem.types";

function HeaderSearchItem({ product, setInputValue }: THeaderSearchItemProps) {
  const { locale, currency } = useSelector((state: TRootState) => state.config);

  return (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="block p-2 hover:bg-gray-100"
      onClick={() => setInputValue("")}
    >
      <div className="flex items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-10 h-10 object-cover rounded mr-2"
        />
        <div>
          <div className="text-sm font-medium text-gray-900">
            {product.title}
          </div>
          <div className="text-sm text-gray-500">
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency,
            }).format(product.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeaderSearchItem;
