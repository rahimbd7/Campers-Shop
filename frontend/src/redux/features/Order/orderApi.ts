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
      invalidatesTags: ["Cart", "Order"], // Optional
    }),
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/orders/get-user-orders/${userId}`,
      }),
      providesTags: ["Order"],
    }),
   getAllOrders: builder.query({
      query: () => ({
        url: "/orders/get-all-orders",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/update-order-status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"], // Optional 
    })
  })
});

export const { usePlaceOrderMutation, useGetUserOrdersQuery, useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
