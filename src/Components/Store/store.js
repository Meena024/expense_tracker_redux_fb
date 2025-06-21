import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import ProfileSlice from "./Slices/ProfileSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Profile: ProfileSlice,
  },
});
