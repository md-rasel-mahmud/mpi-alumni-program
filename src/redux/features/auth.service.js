import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
