import baseApi from "../baseApi";

// Define a service using a base URL and expected endpoints
export const utilApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // upload image
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "https://api.cloudinary.com/v1_1/db0nm9rt3/image/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default utilApi;
export const { useUploadImageMutation } = utilApi;
