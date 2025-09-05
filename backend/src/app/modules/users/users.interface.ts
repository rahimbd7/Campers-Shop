import { Model } from 'mongoose';
export interface IUser {
    _id: any;
    firebaseUid?: string
    name: string;
    email?: string;
    password?: string;
    role?: string;
    contactNo?: string;
    address?: string;
    isDeleted?: boolean
    profile_img?: string
    provider?: string
}

export interface IUserService extends Model<IUser> {
    isUserExists(email: string): Promise<IUser>;
    isFirebaseUserExists(firebaseUid: string): Promise<IUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}