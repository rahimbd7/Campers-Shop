
import  express  from 'express';
import { AuthController } from './auth.controller';
const authRouter = express.Router();

authRouter.post('/login',AuthController.loginUser);

export const AuthRoutes = authRouter