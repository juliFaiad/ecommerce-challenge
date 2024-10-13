import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { type TCartItem, toggleCart } from "@/lib/store/cartSlice";
import { type TRootState } from "@/lib/store";
import { CartEmpty } from "./CartEmpty";
import { CartProduct } from "./CartProduct";
import { CartTotal } from "./CartTotal";

function Cart() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: TRootState) => state.cart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={() => dispatch(toggleCart())}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              {items.map((item: TCartItem) => (
                <CartProduct key={item.id} item={item} />
              ))}
              <CartTotal />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
