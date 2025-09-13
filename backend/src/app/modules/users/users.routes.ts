import express, { Request, Response, NextFunction } from "express";
import { UserController } from "./users.controller";
import validateRequest from './../../middlewares/validateRequest';
import { UserValidation } from "./users.validate";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./users.constants";
import multer from "multer";

// Use memoryStorage for direct Cloudinary upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

const userRouter = express.Router();

// CREATE User
userRouter.post(
  "/create-user",
  upload.single("profile_img"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

// GET all users
userRouter.get("/get-all-user", auth(USER_ROLE.admin), UserController.getAllUsers);

// GET user by ID
userRouter.get(
  "/get-user/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUserById
);

// UPDATE User
userRouter.put(
  "/update-user/:id",
  upload.single("profile_img"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// DELETE User
userRouter.delete("/delete-user/:id", auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = userRouter;
