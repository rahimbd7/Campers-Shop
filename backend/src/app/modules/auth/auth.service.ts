
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import UserModel from "../users/users.model";
import admin from "../../middlewares/firebase";
import { JwtPayload } from "jsonwebtoken";



const loginUser = async (payload: IAuth) => {
  const user = await UserModel.isUserExists(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not found');
  }
  // is the user is deleted or not
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }
  //is the password is matched
  if (!await UserModel.isPasswordMatched(payload?.password, user?.password as string)) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched');
  }

  //create jwt access token
  const jwtPayload = {
    id: user?._id,
    email: user?.email as string,
    role: user?.role as string
  };
  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expiresIn as string);
  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expiresIn as string);

  return {
    accessToken,
    refreshToken,
  }
}


const reGeneratedAccessTokenByRefreshToken = async (refreshToken: string) => {
  //check token has sent from client or not
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  //verify the token
  const decoded = verifyToken(refreshToken, config.jwt_refresh_secret as string) as JwtPayload;
  const { userId, iat } = decoded;

  //is the user is exists?
  const user = await UserModel.isUserExists(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not found');
  }
  // //is the user is deleted or not
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }
  //create jwt access token

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role as string
  };
  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expiresIn as string);
  return accessToken;

}

// ✅ New service for Firebase login
const loginWithFirebase = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
     const rawProvider = decodedToken?.firebase?.sign_in_provider || "firebase";
    const provider = rawProvider.replace(/\.[^/.]+$/, "").toLowerCase();

    let user = await UserModel.isFirebaseUserExists(decodedToken?.uid as string);

    if (!user) {
      user = await UserModel.create({
        name: decodedToken?.name || null,
        firebaseUid: decodedToken?.uid,
        email: decodedToken?.email || null,
        role: "user",
        profile_img: decodedToken?.photoURL || decodedToken?.picture || null,
        provider,
      });
    }
    const jwtPayload = {
      id: user?._id.toString(),
      email: user?.email as string || null,
      role: user?.role as string || "user",
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expiresIn as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expiresIn as string
    );
    return { accessToken, refreshToken, user };
  } catch (error) {
    console.error("❌ Firebase login error:", error);
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Firebase token verification failed"
    );
  }
};

export const AuthService = {
  loginUser,
  loginWithFirebase,
  reGeneratedAccessTokenByRefreshToken
};

