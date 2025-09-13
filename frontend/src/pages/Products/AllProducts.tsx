/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import ProductCart from "../../components/ProductCart";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import type { RootState } from "../../redux/store";
import type { IProduct } from "../../interface/IProduct";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import type { ICategory } from "../../interface/ICategory";
import {motion} from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner";
const FilterSidebar = ({
  search,
  setSearch,
  categoryId,
  setCategoryId,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  applyFilters,
  clearFilters,
  setIsFilterOpen,
  categories
}: {
  search: string;
  setSearch: (value: string) => void;
  categoryId: string;
  setCategoryId: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  setIsFilterOpen: (value: boolean) => void;
  categories: ICategory[]
}) => (
  <aside className="bg-base-200 p-4 rounded-lg shadow-md space-y-4 w-full max-w-xs lg:max-w-full">
    <h2 className="text-lg font-semibold mb-2">Filters</h2>

    {/* Search */}
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="input input-bordered w-full"
    />

    {/* Category */}
    <select
      className="select select-bordered w-full"
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>

    {/* Price Range */}
    <div>
      <label className="block mb-1 font-medium">Price Range</label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
    </div>

    {/* Sort */}
    <div>
      <label className="block mb-1 font-medium">Sort By</label>
      <select
        className="select select-bordered w-full mb-2"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Newest</option>
      </select>
      <select
        className="select select-bordered w-full"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-2">
      <button onClick={applyFilters} className="btn btn-primary w-full">
        Apply Filters
      </button>
      <button onClick={clearFilters} className="btn btn-outline w-full">
        Clear Filters
      </button>
      <button
        onClick={() => setIsFilterOpen(false)}
        className="btn btn-ghost w-full lg:hidden"
      >
        Close
      </button>
    </div>
  </aside>
);

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data:categories, isLoading } = useGetCategoriesQuery();

   const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const [appliedFilters, setAppliedFilters] = useState({
  search: "",
  categoryId: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "name",
  sortOrder: "asc",
});

const { refetch } = useGetAllProductsQuery(appliedFilters, {
  refetchOnMountOrArgChange: true,
});


const productData: IProduct[] = useSelector(
  (state: RootState) => state.product.products
);

const applyFilters = useCallback(() => {
  setAppliedFilters({ search, categoryId, minPrice, maxPrice, sortBy, sortOrder });
  setIsFilterOpen(false);
  refetch();
}, [search, categoryId, minPrice, maxPrice, sortBy, sortOrder, refetch]);

const clearFilters = useCallback(() => {
  setSearch(""); setCategoryId(""); setMinPrice(""); setMaxPrice("");
  setSortBy("name"); setSortOrder("asc");
  setAppliedFilters({ search: "", categoryId: "", minPrice: "", maxPrice: "", sortBy: "name", sortOrder: "asc" });
  setIsFilterOpen(false);
  refetch();
}, [refetch]);

if (isLoading) return <div><LoadingSpinner message="Products loading..." /></div>;
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>

      {/* Mobile Filter Button */}
      <div className="flex justify-end mb-4 lg:hidden">
        <button className="btn btn-primary" onClick={() => setIsFilterOpen(true)}>
          Filter Products
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            search={search} setSearch={setSearch}
            categoryId={categoryId} setCategoryId={setCategoryId}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            sortBy={sortBy} setSortBy={setSortBy}
            sortOrder={sortOrder} setSortOrder={setSortOrder}
            applyFilters={applyFilters} clearFilters={clearFilters}
            setIsFilterOpen={setIsFilterOpen}
            categories = {categories?.data || []}
          />
        </div>

        {/* Product Grid */}
       <main className="lg:col-span-3 w-full">
  {productData?.length > 0 ? (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 }, // animate each card one by one
        },
      }}
    >
      {productData.map((product) => (
        <motion.div key={product._id} variants={cardVariants}>
          <ProductCart cartData={product} />
        </motion.div>
      ))}
    </motion.div>
  ) : (
    <p className="text-center text-gray-500">No products found.</p>
  )}
</main>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0  bg-opacity-40 z-40 flex justify-end">
          <div className=" p-4 h-full w-72 shadow-lg animate-slide-in-middle ">
            <FilterSidebar
              search={search} setSearch={setSearch}
              categoryId={categoryId} setCategoryId={setCategoryId}
              minPrice={minPrice} setMinPrice={setMinPrice}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              sortBy={sortBy} setSortBy={setSortBy}
              sortOrder={sortOrder} setSortOrder={setSortOrder}
              applyFilters={applyFilters} clearFilters={clearFilters}
              setIsFilterOpen={setIsFilterOpen}
              categories = {categories?.data || []}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
