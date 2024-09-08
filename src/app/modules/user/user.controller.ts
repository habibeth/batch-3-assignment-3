import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
    const user = req.body;

    const result = await UserServices.createUserIntoDB(user);
    sendResponse(res, {
        message: 'User registered successfully',
        data: result
    })
})


export const UserControllers = {
    createUser
}
