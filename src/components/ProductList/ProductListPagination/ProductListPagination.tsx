import clsx from "clsx";
import { memo, useEffect } from "react";
import { type TProductListPaginationProps } from "./ProductListPagination.types";

const ProductListPagination = memo(
  ({
    currentPage,
    totalPages,
    handlePageChange,
  }: TProductListPaginationProps) => {
    const pageNumbers = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    useEffect(() => {
      // handle case where filter makes it so there are less pages (return to first page)
      if (currentPage > totalPages) {
        handlePageChange(1);
      }
    }, [currentPage, totalPages, handlePageChange]);

    return (
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={clsx(
              "hidden sm:inline-block mx-1 px-3 py-1 rounded",
              currentPage === number
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }
);

export default ProductListPagination;
