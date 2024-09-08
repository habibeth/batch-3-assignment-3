import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/user/user.model";


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bearerToken: any = req.headers.authorization;

        if (!bearerToken) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "You have no access to this route",
            })
        }

        const splitToken = bearerToken?.split(' ')
        const token = splitToken[1];

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'UnAuthorized');
        }


        const { role, email } = decoded;

        const user = await User.isUserExistsByEmailAddress(email);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
        }


        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized',
            );
        }

        req.user = decoded as JwtPayload & { role: string };
        next();
    });
};

export default auth;