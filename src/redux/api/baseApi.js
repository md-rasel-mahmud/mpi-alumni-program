import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Login", "users"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_server_url_dev }),
  endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default baseApi;
export const { useLoginMutation } = baseApi;
