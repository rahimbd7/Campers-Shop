// src/features/order/orderApi.ts
import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Cart"], // Optional
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
