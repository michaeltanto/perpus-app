import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    userSlice,
  },
=======
// import userSlice from "./userSlice";
import bookSlice from "./bookSlice";

export default configureStore({
    reducer: {
     bookSlice
    },
>>>>>>> c768913a95c76e4e78414e5cc17365b41670cd77
});