import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
}

export type TUserRole = keyof typeof USER_ROLE;


export interface UserModel extends Model<TUser> {
    isUserExistsByEmailAddress(email: string): Promise<TUser>;
}