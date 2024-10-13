import { useEffect, useState, useMemo, useCallback } from "react";
import { memo } from "react";
import { ProductListCardSkeleton } from "./ProducListCard/ProductListCardSkeleton";
import { useGetProductsQuery, LIMITS } from "@/lib/service/product";
import { ProductListCard } from "./ProducListCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { type TRootState } from "@/lib/store";
import { ProductListPagination } from "./ProductListPagination";

const ProductList = memo(function ProductList() {
  const { slug } = useParams();
  const sort = useSelector((state: TRootState) => state.productsSort.sort);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    sort: sort ?? undefined,
    page: currentPage,
    slug,
  });

  useEffect(() => {
    refetch();
  }, [sort, refetch]);

  const totalPages = useMemo(
    () => Math.ceil((data?.total ?? 0) / LIMITS.PRODUCTS_PER_PAGE),
    [data?.total]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductListCardSkeleton key={index} />
            ))
          : data?.products?.map((product) => (
              <ProductListCard key={product.id} product={product} />
            ))}
      </div>
      {data?.products && (
        <ProductListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
});

export default ProductList;
