import type { IProduct } from "../../../interface/IProduct";
import { baseApi } from "../../api/baseApi";
import { setProducts } from "./productSlice";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<{ data: IProduct[] }, void>({
      query: () => ({
        url: "/products/get-all-products",
      }),
      providesTags: ["Product"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data.data));
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      }
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["Product"],
    }),
    getProductByCategory: builder.query<IProduct[], string>({
      query: (categoryId) => ({
        url: `/products/category/${categoryId}`,
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductByCategoryQuery } =
  productApi;