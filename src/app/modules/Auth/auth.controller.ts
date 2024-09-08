import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, user } = result;


    sendResponse(res, {
        message: "User Login Successfully!",
        token: accessToken,
        data: user,
    })
})



export const AuthControllers = {
    loginUser,
}