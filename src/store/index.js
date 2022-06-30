import { configureStore } from "@reduxjs/toolkit";
import masterReducer from "./master";
export const store = configureStore({
  reducer: {
    master: masterReducer,
  },
});
