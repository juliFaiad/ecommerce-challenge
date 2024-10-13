import { useSelector } from "react-redux";
import { type TCartItem } from "@/lib/store/cartSlice";
import { type TRootState } from "@/lib/store";

function CartTotal() {
  const { items } = useSelector((state: TRootState) => state.cart);
  const { locale, currency } = useSelector((state: TRootState) => state.config);
  const totalPrice = items.reduce(
    (total: number, item: TCartItem) => total + item.price * item.quantity,
    0
  );

  function attemptCheckout() {
    // TODO: implement checkout
    console.log(JSON.stringify(items, null, 2));
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center text-xl font-bold">
        <span>Total:</span>
        <span>
          {new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
          }).format(totalPrice)}
        </span>
      </div>
      <button
        className="w-full mt-4 bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-300"
        onClick={() => attemptCheckout()}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartTotal;
