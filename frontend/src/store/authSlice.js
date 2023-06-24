import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  products: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
