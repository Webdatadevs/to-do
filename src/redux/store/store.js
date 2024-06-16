import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice";
import categorySliceReducer from "../slice/categorySlice"; 

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    todoCategory: categorySliceReducer,
  },
});
