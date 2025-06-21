import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";

const initialState = {
  toggleProfileForm: false,
};

export const handleUpdateProfile = createAsyncThunk(
  "Profile/handleUpdateProfile",
  async ({ name, photoURL }, thunkAPI) => {
    try {
      await updateProfile(getAuth().currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      console.log("Profile updated!");
    } catch (err) {
      console.log("Profile update error:", err.message);
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

const ProfileSlice = createSlice({
  name: "Profile",
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
