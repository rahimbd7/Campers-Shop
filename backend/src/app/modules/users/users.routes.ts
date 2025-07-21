import express from "express";
import { UserController } from "./users.controller";
import validateRequest from './../../middlewares/validateRequest';
import { UserValidation } from "./users.validate";




const userRouter = express.Router();

userRouter.post('/create-user',validateRequest(UserValidation.createUserZodSchema),UserController.createUser);
userRouter.get('/get-all-user',UserController.getAllUsers);
userRouter.get('/get-user/:id',UserController.getUserById);
userRouter.put('/update-user/:id',validateRequest(UserValidation.updateUserZodSchema),UserController.updateUser);
userRouter.delete('/delete-user/:id',UserController.deleteUser);

export const UserRoutes = userRouter
