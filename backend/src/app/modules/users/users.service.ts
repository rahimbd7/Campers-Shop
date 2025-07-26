import { NextFunction } from "express";
import { IUser } from "./users.interface"
import UserModel from "./users.model";
import httpStatus from 'http-status';
import AppError from "../../errors/AppError";

const createUserIntoDB = async (user: IUser, next: NextFunction) => {
    
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
    const result = await UserModel.findById(id);
    return result
 }
const updateUserIntoDB = async (id: string, payload: IUser) => { 
    console.log(payload);
    const result =  await UserModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result
}
const deleteUserFromDB = async (id: string) => { 
    const result =  await UserModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return result
}

export const UserService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserIntoDB,
    deleteUserFromDB
}

