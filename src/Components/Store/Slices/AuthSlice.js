import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Firebase/initialize";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const handleSignUp = createAsyncThunk(
  "Auth/handleSignUp",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "Auth/handleLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user, user.displayName);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const handlerLogout = createAsyncThunk(
  "Auth/handlerLogout",
  async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  }
);

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
      state.user = action.payload ? { ...action.payload } : null;
      console.log("setuser", state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(handleSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
