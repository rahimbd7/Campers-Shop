/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useGetCategoriesQuery } from "../redux/features/category/categoryApi";
import CategoryCard from "./CategoryCard";

const Category = () => {
    //call api
   const { data: categories, isLoading, isError } =  useGetCategoriesQuery();
    const categoryData = useSelector((state: RootState) => state.category.categories);
    console.log('data from state', categoryData);
    console.log('data from redux', categories);
  return (
    <div className="container   mx-auto  border-2">
      <h1 className="text-3xl text-center py-8">Product Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData?.map((category) => (
          <CategoryCard key={category._id} categoryData={category} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Category;
