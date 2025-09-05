
import  express  from 'express';
import { AuthController,  } from './auth.controller';
const authRouter = express.Router();

authRouter.post('/login',AuthController.loginUser);
authRouter.post('/refresh-token',AuthController.refreshToken);
authRouter.post('/firebase-login',
AuthController.firebaseLogin);

export const AuthRoutes = authRouter