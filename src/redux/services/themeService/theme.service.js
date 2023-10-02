import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
      localStorage.setItem("theme", payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
