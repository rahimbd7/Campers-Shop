import { NextFunction } from "express";
import { IUser } from "./users.interface"
import UserModel from "./users.model";
import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import uploadImageToCloudinary from "../../utils/FileUploader/uploadImageToCloudinary";
import mongoose, { get } from "mongoose";
import { getUserQuery } from "./users.utils";

const createUserIntoDB = async (file:any,user: IUser, next: NextFunction) => {
    if(file){
        
        const {path} = file;
        if(path){
        const filename =  `${user?.email}`;
        const {secure_url} = await uploadImageToCloudinary(filename, path);
        user.profile_img = secure_url as string;
    }
    }
    
        const result = await UserModel.create(user);
        if (!result)
            throw new AppError(httpStatus.BAD_REQUEST, 'User is not created')
        return result;
   
}
const getAllUsersFromDB = async () => {
    const result = await UserModel.find({ isDeleted: false }, { password: 0, createdAt: 0, updatedAt: 0 });
    return result
 }
const getUserByIdFromDB = async (id: string) => {
  
  const result = await UserModel.findById({ _id: id, isDeleted: false }, { password: 0, createdAt: 0, updatedAt: 0 });
  return result
 }
const updateUserIntoDB = async (file:any,id: string, payload: Partial<IUser>) => { 
    
    if(file  && file?.path){
        const filename =  `${payload?.email}`;
        const {secure_url} = await uploadImageToCloudinary(filename, file.path);
        payload.profile_img = secure_url as string;
    }
    const query = getUserQuery(id);
    const result =  await UserModel.findOneAndUpdate(query, payload, { new: true });
    return result
}
const deleteUserFromDB = async (id: string) => { 
     const query = getUserQuery(id);
    const result =  await UserModel.findOneAndUpdate(query, { isDeleted: true }, { new: true });
    return result
}

export const UserService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserIntoDB,
    deleteUserFromDB
}

