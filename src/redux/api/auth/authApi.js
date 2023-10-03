import baseApi from "../baseApi";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register user
    register: builder.mutation({
      query: (registerBody) => ({
        url: "auth/register",
        method: "POST",
        body: registerBody,
      }),

      invalidatesTags: ["auth", "users"],
    }),

    // login user
    login: builder.mutation({
      query: (loginBody) => ({
        url: "auth/login",
        method: "POST",
        body: loginBody,
      }),

      invalidatesTags: ["auth", "users"],
    }),

    // get user
    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default authApi;
export const { useGetUserQuery, useLoginMutation, useRegisterMutation } =
  authApi;
