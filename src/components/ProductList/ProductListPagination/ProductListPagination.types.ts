export type TProductListPaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};
