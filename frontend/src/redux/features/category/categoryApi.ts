import type { ICategory } from "../../../interface/ICategory";
import { baseApi } from "../../api/baseApi";

import { setCategories, addCategory } from "./categorySlice"; // import from your slice

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all categories
    getCategories: builder.query<{ data: ICategory[] }, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["Category"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategories(data.data)); // Sync to categorySlice
        } catch (error) {
          console.error("Failed to fetch categories", error);
        }
      },
    }),

    // POST create new category
    createCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (newCategory) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addCategory(data)); // Add to categorySlice
        } catch (error) {
          console.error("Failed to create category", error);
        }
      },
    }),

    //Delete category
    deleteCategory: builder.mutation<ICategory, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;

export default categoryApi;
