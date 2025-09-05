import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from 'http-status'
import config from '../../config'


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'development',
        httpOnly: true
    })
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'login successfully', data: result })
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.reGeneratedAccessTokenByRefreshToken(refreshToken);
    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'development',
        httpOnly: true
    })
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'login successfully', data: result })
})

const firebaseLogin = catchAsync(async (req, res) => {
  const { token } = req.body; // from frontend
  const result = await AuthService.loginWithFirebase(token);
  res.cookie("refreshToken", result.refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Firebase login successful",
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});



export const AuthController = {
  loginUser,
  firebaseLogin,
  refreshToken
};