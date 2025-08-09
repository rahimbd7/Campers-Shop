/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useGetCategoriesQuery } from "../redux/features/category/categoryApi";
import CategoryCard from "./CategoryCard";

const Category = () => {
  //call api
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const categoryData = useSelector(
    (state: RootState) => state.category.categories
  );
  return (
    <div className="container   mx-auto"  >
      <h1 className="text-[#605DFF] text-3xl font-bold lg:text-5xl text-center  md:py-8 lg:py-10">
        Product Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
        {categoryData?.map((category) => (
          <CategoryCard key={category._id} categoryData={category} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Category;
