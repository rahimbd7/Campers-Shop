// import { NextFunction } from "express";
// import { IUser } from "./users.interface"
// import UserModel from "./users.model";
// import httpStatus from 'http-status';
// import AppError from "../../errors/AppError";
// import uploadImageToCloudinary from "../../utils/FileUploader/uploadImageToCloudinary";
// import mongoose, { get } from "mongoose";
// import { getUserQuery } from "./users.utils";

// const createUserIntoDB = async (file:any,user: IUser, next: NextFunction) => {
//     if(file){
        
//         const {path} = file;
//         if(path){
//         const filename =  `${user?.email}`;
//         const {secure_url} = await uploadImageToCloudinary(filename, path);
//         user.profile_img = secure_url as string;
//     }
//     }
    
//         const result = await UserModel.create(user);
//         if (!result)
//             throw new AppError(httpStatus.BAD_REQUEST, 'User is not created')
//         return result;
   
// }
// const getAllUsersFromDB = async () => {
//     const result = await UserModel.find({ isDeleted: false }, { password: 0, createdAt: 0, updatedAt: 0 });
//     return result
//  }
// const getUserByIdFromDB = async (id: string) => {
  
//   const result = await UserModel.findById({ _id: id, isDeleted: false }, { password: 0, createdAt: 0, updatedAt: 0 });
//   return result
//  }
// const updateUserIntoDB = async (file:any,id: string, payload: Partial<IUser>) => { 
    
//     if(file  && file?.path){
//         const filename =  `${payload?.email}`;
//         const {secure_url} = await uploadImageToCloudinary(filename, file.path);
//         payload.profile_img = secure_url as string;
//     }
//     const query = getUserQuery(id);
//     const result =  await UserModel.findOneAndUpdate(query, payload, { new: true });
//     return result
// }
// const deleteUserFromDB = async (id: string) => { 
//      const query = getUserQuery(id);
//     const result =  await UserModel.findOneAndUpdate(query, { isDeleted: true }, { new: true });
//     return result
// }

// export const UserService = {
//     createUserIntoDB,
//     getAllUsersFromDB,
//     getUserByIdFromDB,
//     updateUserIntoDB,
//     deleteUserFromDB
// }





import { NextFunction } from "express";
import { IUser } from "./users.interface";
import UserModel from "./users.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import uploadBufferToCloudinary, { deleteImageFromCloudinary } from "../../utils/FileUploader/cloudinaryDirectFileUpload";
import { getUserQuery } from "./users.utils";

const CLOUD_FOLDER = "users"; // Cloudinary folder for user profile images

const createUserIntoDB = async (file: any, user: IUser, next: NextFunction) => {
  if (file && file.buffer) {
    const filename = `${user?.email}-${Date.now()}`;
    const { secure_url } = await uploadBufferToCloudinary(file.buffer, filename, CLOUD_FOLDER);
    user.profile_img = secure_url as string;
  }

  const result = await UserModel.create(user);
  if (!result)
    throw new AppError(httpStatus.BAD_REQUEST, "User is not created");

  return result;
};

const getAllUsersFromDB = async () => {
  return await UserModel.find(
    { isDeleted: false },
    { password: 0, createdAt: 0, updatedAt: 0 }
  );
};

const getUserByIdFromDB = async (id: string) => {
  return await UserModel.findById(
    { _id: id, isDeleted: false },
    { password: 0, createdAt: 0, updatedAt: 0 }
  );
};

const updateUserIntoDB = async (file: any, id: string, payload: Partial<IUser>) => {
  const query = getUserQuery(id);
  const user = await UserModel.findOne(query);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  // ✅ Delete old image if a new one is uploaded
  if (file && file.buffer) {
    if (user.profile_img) {
      await deleteImageFromCloudinary(user.profile_img);
    }
    const filename = `${payload?.email || user.email}-${Date.now()}`;
    const { secure_url } = await uploadBufferToCloudinary(file.buffer, filename, CLOUD_FOLDER);
    payload.profile_img = secure_url as string;
  }

  const { ...restPayload } = payload;
  Object.assign(user, restPayload);
  await user.save();

  return user;
};








const deleteUserFromDB = async (id: string) => {
  const query = getUserQuery(id);
  const user = await UserModel.findOne(query);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  // Optionally, delete the profile image from Cloudinary when user is deleted
  if (user.profile_img) {
    await deleteImageFromCloudinary(user.profile_img);
  }

  user.isDeleted = true;
  await user.save();
  return user;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
