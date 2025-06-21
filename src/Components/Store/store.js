import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import ProfileSlice from "./Slices/ProfileSlice";
import ExpenseSlice from "./Slices/ExpenseSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Profile: ProfileSlice,
    Expense: ExpenseSlice,
  },
});
