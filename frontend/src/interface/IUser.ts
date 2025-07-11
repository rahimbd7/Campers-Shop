
export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: string;
    contactNo: string;
    address?: string;
    isDeleted?: boolean
}