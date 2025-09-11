import express, { Request, Response, NextFunction } from "express";
import { UserController } from "./users.controller";
import validateRequest from './../../middlewares/validateRequest';
import { UserValidation } from "./users.validate";
import { upload } from "../../utils/FileUploader/fileUploadByMulter";
import { validateImageFile } from "../../middlewares/validateImageFile";
import { json } from "stream/consumers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./users.constants";




const userRouter = express.Router();

userRouter.post('/create-user',
    upload.single('profile_img'),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateImageFile(2),
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser);


userRouter.get('/get-all-user', auth(USER_ROLE.admin), UserController.getAllUsers);

userRouter.get('/get-user/:id', 
auth(USER_ROLE.admin, USER_ROLE.user),
UserController.getUserById);

userRouter.put('/update-user/:id',
    upload.single('profile_img'),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateImageFile(2),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser);


userRouter.delete('/delete-user/:id',auth (USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = userRouter
