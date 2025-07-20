
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import config from "../../config";
import UserModel from "../users/users.model";



const loginUser = async (payload: IAuth) =>{
    //is the user is exists?
    // console.log(payload);
    const user = await UserModel.isUserExists(payload?.email);
    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User is not found');
    }
    // //is the user is deleted or not
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
        email: user?.email,
        role: user?.role as string
    };
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expiresIn as string );
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expiresIn  as string);
  
    return {
        accessToken,
        refreshToken,
    }
}

export const AuthService = {
  loginUser,
};

