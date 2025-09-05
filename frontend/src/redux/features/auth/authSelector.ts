// selectors.ts (inside auth folder)

import type { RootState } from "../../store";


export const selectCurrentUser = (state: RootState) => {
  if (state.auth.backendUser) {
    return {
      type: "backend",
      user: state.auth.backendUser,
    };
  }
  if (state.auth.firebaseUser) {
    return {
      type: "firebase",
      user: state.auth.firebaseUser,
    };
  }
  return null;
};


