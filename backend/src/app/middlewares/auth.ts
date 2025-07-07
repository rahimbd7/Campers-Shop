
import catchAsync from '../../shared/catchAsync';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserModel from '../modules/users/users.model';
import { TUSER } from '../modules/users/users.constants';
import { NextFunction, Request, Response } from 'express';


const auth = (...requiredRole: TUSER[]) => async (req:Request, res:Response, next:NextFunction) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('You are not logged in')
        }
        const decodedToken = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const { email, role } = decodedToken;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found')
        }
        if (user.role !== role) {
            throw new Error('Unauthorized')
        }
        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('Unauthorized')
        }
        req.user = decodedToken as JwtPayload;
        next()
    })
}
export default auth