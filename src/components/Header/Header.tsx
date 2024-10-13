import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { type TAppDispatch, type TRootState } from "@/lib/store";
import { toggleCart } from "@/lib/store/cartSlice";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderSub } from "./HeaderSub";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch<TAppDispatch>();
  const cartItems = useSelector((state: TRootState) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md relative z-10 flex flex-col">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            DeLux Store
          </Link>
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 text-gray-600 hover:text-gray-900 sm:hidden"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center w-full sm:w-auto md:justify-between flex-col md:flex-row gap-4">
          <HeaderSearch />
          <button
            name="cart"
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 text-gray-600 hover:text-gray-900 hidden sm:block"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="md:mx-auto md:px-4 md:pb-5 px-4 pb-4">
        {/* TODO: find more elegant way to handle route references*/}
        {(location.pathname === "/" ||
          location.pathname.includes("/category")) && <HeaderSub />}
      </div>
    </header>
  );
}

export default Header;
