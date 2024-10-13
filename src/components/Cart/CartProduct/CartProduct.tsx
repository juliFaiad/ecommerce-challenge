import { useDispatch, useSelector } from "react-redux";
import { type TAppDispatch, type TRootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/lib/store/cartSlice";
import { Minus, Plus, X } from "lucide-react";
import { type TCartProductProps } from "./CartProduct.types";

function CartProduct({ item }: TCartProductProps) {
  const dispatch = useDispatch<TAppDispatch>();
  const { locale, currency } = useSelector((state: TRootState) => state.config);

  return (
    <div
      key={item.id}
      className="flex items-center border-b border-gray-200 py-4"
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 object-cover rounded mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600">
          {new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
          }).format(item.price)}
        </p>
        <div className="flex items-center mt-2">
          <button
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: Math.max(1, item.quantity - 1),
                })
              )
            }
            className="text-gray-500 hover:text-gray-700"
          >
            <Minus size={16} />
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: item.quantity + 1,
                })
              )
            }
            className="text-gray-500 hover:text-gray-700"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-red-500 hover:text-red-700 ml-4"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default CartProduct;
