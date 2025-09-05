// utils/userHelpers.ts
import mongoose from "mongoose";

export const getUserQuery = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
    ? { _id: id }           // backend user
    : { firebaseUid: id };  // firebase user
};
