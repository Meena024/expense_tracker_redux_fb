import { createSlice } from "@reduxjs/toolkit";
import {
  handleSignUp,
  handleLogin,
  handleLogout,
  handleForgotPassword,
} from "./AuthSliceThunk";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(handleSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(handleLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(handleForgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleForgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(handleForgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
