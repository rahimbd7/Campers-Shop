import { Model } from 'mongoose';
export interface IUser {
    _id: any;
    name: string;
    email: string;
    password: string;
    role?: string;
    contactNo: string;
    address?: string;
    isDeleted?: boolean
    profile_img?: string
}

export interface IUserService extends Model<IUser> {
    isUserExists(email: string): Promise<IUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}