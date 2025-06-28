import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProfile, getAuth } from "firebase/auth";

const initialState = {
  toggleProfileForm: false,
  user: null,
  status: "idle",
  error: null,
};

// ─────────────────────────────────────────────
// UPDATE PROFILE THUNK
export const handleUpdateProfile = createAsyncThunk(
  "profile/handleUpdateProfile",
  async ({ name, photoURL }, { rejectWithValue }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return rejectWithValue("No authenticated user");

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      return {
        displayName: name,
        photoURL,
        email: user.email,
        uid: user.uid,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─────────────────────────────────────────────
// SLICE
const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setToggleProfileForm: (state) => {
      state.toggleProfileForm = !state.toggleProfileForm;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleUpdateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleUpdateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(handleUpdateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setToggleProfileForm } = ProfileSlice.actions;
export default ProfileSlice.reducer;
