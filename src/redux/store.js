import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../store/slices/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
}); 