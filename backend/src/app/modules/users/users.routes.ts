import express, { Request, Response, NextFunction } from "express";
import { UserController } from "./users.controller";
import validateRequest from './../../middlewares/validateRequest';
import { UserValidation } from "./users.validate";
import { upload } from "../../utils/FileUploader/fileUploadByMulter";
import { validateImageFile } from "../../middlewares/validateImageFile";




const userRouter = express.Router();

userRouter.post('/create-user',
    upload.single('profile_img'), 
    validateImageFile(2),
    validateRequest(UserValidation.createUserZodSchema), 
    UserController.createUser);


userRouter.get('/get-all-user', UserController.getAllUsers);
userRouter.get('/get-user/:id', UserController.getUserById);
userRouter.put('/update-user/:id', 
    upload.single('profile_img'),
    validateImageFile(2),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser);


userRouter.delete('/delete-user/:id', UserController.deleteUser);

export const UserRoutes = userRouter
