// src/redux/features/payment/paymentApi.ts
import baseApi from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStripePayment: builder.mutation<{ clientSecret: string }, { amount: number; currency: string }>({
      query: (body) => ({
        url: "/payment/create-stripe-payment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateStripePaymentMutation } = paymentApi;
export default paymentApi;
