import { baseApi } from "../../api/baseApi";
import type { IProduct } from "../../../interface/IProduct";
import { setProducts, setCategoryWiseProducts, setProductById } from "./productSlice";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: "/products/get-all-products",
      }),
      providesTags: ["Product"],
      async onQueryStarted(_getAllProducts, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data.data));
        } catch (error) {
          console.error("Error fetching all products:", error);
        }
      },
    }),

    getProductByCategory: builder.query<IProduct[], string>({
      query: (categoryId) => ({
        url: `/products/category/${categoryId}`,
      }),
      providesTags: ["Product"],
      async onQueryStarted(_categoryId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategoryWiseProducts(data.data));
        } catch (error) {
          console.error("Error fetching products by category:", error);
        }
      },
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/products/get-product/${id}`,
      }),
      providesTags: ["Product"],
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProductById(data.data));
        } catch (error) {
          console.error("Error fetching product by ID:", error);
        }
      }
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
} = productApi;
