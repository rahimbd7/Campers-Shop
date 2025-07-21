// src/features/order/orderApi.ts
import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Cart"], // Optional
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
