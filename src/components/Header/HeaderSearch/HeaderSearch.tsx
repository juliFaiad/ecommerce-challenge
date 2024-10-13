import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchProductsQuery } from "@/lib/service/product";
import { HeaderSearchItem } from "./HeaderSearchItem";
import { HeaderSearchFilterCategory } from "./HeaderSearchFilters/HeaderSearchFilterCategory";

// TODO: find more elegant way to handle constants
const SEARCH_DEBOUNCE_DELAY = 300;

function HeaderSearch() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { data: results, isLoading: isSearchLoading } = useSearchProductsQuery(
    debouncedQuery ?? "",
    {
      skip: !debouncedQuery,
    }
  );

  const debouncedSearch = useDebouncedCallback((searchTerm: string) => {
    if (searchTerm.trim()) {
      setDebouncedQuery(searchTerm);
    } else {
      setDebouncedQuery(null);
    }
  }, SEARCH_DEBOUNCE_DELAY);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setInputValue(searchTerm);
    debouncedSearch(searchTerm);
  };

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 300);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setDebouncedQuery(null);
  };

  return (
    <>
      <HeaderSearchFilterCategory />
      <div className="relative w-full">
        <input
          name="search"
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="placeholder:text-sm placeholder:text-slate-400 pl-10 pr-10 py-2 md:w-64 w-full border h-11 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        {inputValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
        {isSearchFocused && inputValue && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isSearchLoading && (
              <div className="p-2 text-center text-gray-500">Loading...</div>
            )}
            {results && results.length === 0 && (
              <div className="p-2 text-center text-gray-500">
                No results found
              </div>
            )}
            {results &&
              results.map((product) => (
                <HeaderSearchItem
                  key={product.id}
                  product={product}
                  setInputValue={setInputValue}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HeaderSearch;
