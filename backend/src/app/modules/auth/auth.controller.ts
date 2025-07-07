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

export const AuthController = {
    loginUser
}