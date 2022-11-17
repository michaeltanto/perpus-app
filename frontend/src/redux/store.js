import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    bookSlice
  },
})