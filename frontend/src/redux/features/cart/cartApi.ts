
//cart api

import { baseApi } from "../../api/baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllProductsDetailsOfCartItems: builder.query({
        query: (payload) => ({
          url: "/cart/details",
          method: "POST",
          body: payload
        }),
      })  
    }),
});

export const { useGetAllProductsDetailsOfCartItemsQuery } = cartApi