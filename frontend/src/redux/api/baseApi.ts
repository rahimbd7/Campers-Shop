import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",

});

export default baseQuery;