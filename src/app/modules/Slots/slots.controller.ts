import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotsServices } from "./slots.service";

const createSlots = catchAsync(async (req, res) => {
    const slotData = req.body;

    const result = await SlotsServices.createSlotsIntoDB(
        slotData
    );

    sendResponse(res, {
        message: 'Slots created successfully',
        data: result,
    });
});

const getAllSlots = catchAsync(async (req, res) => {
    const result = await SlotsServices.getAllSlotsFromDB(req.query);
    sendResponse(res, {
        message: "Available slots retrieved successfully",
        data: result
    })
})


export const SlotsControllers = {
    createSlots,
    getAllSlots
}