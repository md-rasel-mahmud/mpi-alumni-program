import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./services/themeService/theme.service";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
