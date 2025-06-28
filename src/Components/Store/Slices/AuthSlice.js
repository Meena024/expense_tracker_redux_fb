import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Firebase/initialize";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// ─────────────────────────────────────────────
// Utility: Extract user info
const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  verifiedUser: user.emailVerified,
});

// ─────────────────────────────────────────────
// SIGNUP
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

// ─────────────────────────────────────────────
// LOGIN
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

// ─────────────────────────────────────────────
// LOGOUT
export const handleLogout = createAsyncThunk(
  "Auth/handleLogout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Logout failed");
    }
  }
);

// ─────────────────────────────────────────────
// SLICE
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
      // Signup
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

      // Login
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

      // Logout
      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
