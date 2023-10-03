import baseApi from "../baseApi";

// Define a service using a base URL and expected endpoints
export const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // upload image
    getAllUsers: builder.query({
      query: () => "users",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default dashBoardApi;
export const { useGetAllUsersQuery } = dashBoardApi;
