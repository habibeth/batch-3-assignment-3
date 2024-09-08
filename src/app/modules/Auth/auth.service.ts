import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from "./auth.utils";
import AppError from "../../errors/AppError";

const loginUser = async (payload: TLoginUser) => {
    //checking user exists
    const user = await User.isUserExistsByEmailAddress(payload.email);

    (user.password as any) = undefined

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This User is not Found!')
    }

    // create token 
    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)


    return {
        user,
        accessToken,
    }
}


export const AuthServices = {
    loginUser,
}