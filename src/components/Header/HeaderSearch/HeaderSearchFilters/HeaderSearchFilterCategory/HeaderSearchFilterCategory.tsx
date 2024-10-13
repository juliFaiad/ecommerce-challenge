import { useEffect, useState, memo } from "react";
import { useGetCategoriesQuery } from "@/lib/service/product";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import clsx from "clsx";

const HeaderSearchFilterCategory = memo(function HeaderSearchFilterCategory() {
  const location = useLocation();
  const { data: categories } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMobileModal = () => setIsMobileModalOpen(!isMobileModalOpen);

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    setIsOpen(false);
    setIsMobileModalOpen(false);
  };

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const categorySlug = pathParts[pathParts.indexOf("category") + 1];
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    } else {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  const getCategoryName = (slug: string | null) => {
    if (!slug) return "Select Category";
    const category = categories?.find((category) => category.slug === slug);
    return category ? category.name : "Select Category";
  };

  return (
    <div className="relative inline-block text-left md:ml-12 w-full md:w-auto">
      <div className="flex items-center">
        <button
          type="button"
          className={clsx(
            "inline-flex h-11 justify-center items-center w-full rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500 min-w-56",
            !selectedCategory && "text-slate-400 font-normal text-base"
          )}
          onClick={() => {
            if (window.innerWidth < 768) {
              toggleMobileModal();
            } else {
              toggleDropdown();
            }
          }}
        >
          {getCategoryName(selectedCategory)}
          <ChevronDown size={16} className="ml-2" />
        </button>
      </div>

      {/* Desktop dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 hidden md:block"
            onClick={toggleDropdown}
          />
          <div className="z-20 origin-top-left absolute left-0 right-0 md:right-auto md:w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden md:block">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700"
                onClick={() => handleCategorySelect(null)}
              >
                All
              </Link>
              <div className="h-[1px] bg-gray-200 my-2" />
              {categories?.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleCategorySelect(category.slug)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Mobile modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Select Category</h2>
            <button onClick={toggleMobileModal}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <Link
                to="/"
                className="block px-4 py-3 text-base text-gray-700 border-b"
                onClick={() => handleCategorySelect(null)}
              >
                All
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="block px-4 py-3 text-base text-gray-700 border-b"
                  onClick={() => handleCategorySelect(category.slug)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default HeaderSearchFilterCategory;
