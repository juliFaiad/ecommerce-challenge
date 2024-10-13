import { HeaderSubSort } from "./HeaderSubSort";

function HeaderSub() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <HeaderSubSort by="price" />
      <HeaderSubSort by="rating" />
    </div>
  );
}

export default HeaderSub;
