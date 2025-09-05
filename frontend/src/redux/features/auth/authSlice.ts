import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// JWT User (from backend)
export type TBackendUser = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};

// Firebase User
export type TFirebaseUser = {
  id?: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: "admin" | "user" | "seller" | null;
};

// Auth State
type TAuthState = {
  backendUser: null | TBackendUser;
  firebaseUser: null | TFirebaseUser;
  token: null | string; // backend or firebase token
};

const initialState: TAuthState = {
  backendUser: null,
  firebaseUser: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set backend login user
    setBackendUser: (
      state,
      action: PayloadAction<{ user: TBackendUser; token: string }>
    ) => {
      state.backendUser = action.payload.user;
      state.token = action.payload.token;
    },

    // Set firebase login user
    setFirebaseUser: (
      state,
      action: PayloadAction<{ user: TFirebaseUser; token: string }>
    ) => {
      state.firebaseUser = action.payload.user;
      state.token = action.payload.token;
    },

    // Logout clears everything
    logout: (state) => {
      state.backendUser = null;
      state.firebaseUser = null;
      state.token = null;
    },
  },
});

export const { setBackendUser, setFirebaseUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectBackendUser = (state: RootState) => state.auth.backendUser;
export const selectFirebaseUser = (state: RootState) => state.auth.firebaseUser;
