import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import themeSlice from "./features/theme.service";
import authSlice from "./features/auth.service";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    theme: themeSlice,
    authState: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
