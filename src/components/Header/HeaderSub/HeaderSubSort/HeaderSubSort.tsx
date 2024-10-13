import { type TRootState } from "@/lib/store";
import { setSort } from "@/lib/store/productsSlice";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type THeaderSubSortProps } from "./HeaderSubSort.types";

function HeaderSubSort({ by }: THeaderSubSortProps) {
  const { sort } = useSelector((state: TRootState) => state.productsSort);
  const dispatch = useDispatch();
  const isCurrentSort = sort?.field === by;

  const handleSort = () => {
    const values = [null, "asc", "desc"];
    const currentIndex = values.indexOf(sort?.order ?? null);
    const nextIndex = (currentIndex + 1) % values.length;

    dispatch(
      setSort({
        field: by,
        order: values[nextIndex] as "asc" | "desc",
      })
    );
  };

  return (
    <button
      onClick={handleSort}
      className={clsx(
        "flex items-center gap-x-2 mt-4 w-full text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300 justify-center text-nowrap",
        !isCurrentSort || (isCurrentSort && sort?.order === null)
          ? "bg-gray-400"
          : "bg-teal-600"
      )}
    >
      {`Sort by ${by}`}
      {isCurrentSort && sort?.order === "asc" && <ArrowUp size={16} />}
      {isCurrentSort && sort?.order === "desc" && <ArrowDown size={16} />}
    </button>
  );
}

export default HeaderSubSort;
