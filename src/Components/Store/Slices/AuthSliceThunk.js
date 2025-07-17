import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Firebase/initialize";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  verifiedUser: user.emailVerified,
});

export const handleSignUp = createAsyncThunk(
  "Auth/handleSignUp",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("uid", user.uid);
      return formatUser(user);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Signup failed");
    }
  }
);

export const handleLogin = createAsyncThunk(
  "Auth/handleLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", user.uid);
      return formatUser(user);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

export const handleForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent successfully.";
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to send reset email."
      );
    }
  }
);

export const handleLogout = createAsyncThunk(
  "Auth/handleLogout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      localStorage.removeItem("expenses");
      localStorage.removeItem("isPremium");
      localStorage.removeItem("themeColor");
      localStorage.removeItem(
        "firebase:host:expensetracker-a08e8-default-rtdb.firebaseio.com"
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Logout failed");
    }
  }
);
