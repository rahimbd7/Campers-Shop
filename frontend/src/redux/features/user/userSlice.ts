// src/redux/features/user/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userDetails: any | null;
}

const initialState: IUserState = {
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
