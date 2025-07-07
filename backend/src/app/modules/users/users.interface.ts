import { Model } from 'mongoose';
import UserModel from './users.model';
export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: string;
    contactNo: string;
    address?: string;
    isDeleted?: boolean
}

export interface IUserService extends Model<IUser> {
    isUserExists(id: string): Promise<IUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}