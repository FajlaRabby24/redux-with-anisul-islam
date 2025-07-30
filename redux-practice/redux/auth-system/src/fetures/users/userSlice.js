import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/fireabase.config";

const googleProvider = new GoogleAuthProvider();

// 🔁 Monitor auth state
export const monitorAuthState = createAsyncThunk(
  "auth/monitorAuthState",
  async (user) => user
);

// 🆕 Sign up
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
  }
);

// 🔐 Login
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
  }
);

// 🌐 Google Login
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const res = await signInWithPopup(auth, googleProvider);
  return {
    uid: res.user.uid,
    email: res.user.email,
    displayName: res.user.displayName,
    photoURL: res.user.photoURL,
  };
});

// 🔄 Update Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData) => {
    await updateProfile(auth.currentUser, profileData);
    const user = auth.currentUser;
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }
);

// 🚪 Logout
export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
  await signOut(auth);
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // monitor auth state
      .addCase(monitorAuthState.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(monitorAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(monitorAuthState.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })

      // signup
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // login
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // google login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // logout
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
      })

      // update profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
