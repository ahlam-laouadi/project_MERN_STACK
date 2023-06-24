import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import gridSlice from "./gridSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    grid: gridSlice.reducer,
  },
});

export default store;
