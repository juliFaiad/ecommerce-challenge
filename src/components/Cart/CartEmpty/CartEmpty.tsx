import { ShoppingBag } from "lucide-react";

function CartEmpty() {
  return (
    <div className="text-center py-8">
      <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600">Your cart is empty</p>
    </div>
  );
}

export default CartEmpty;
