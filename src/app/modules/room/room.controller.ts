import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./room.service";


const createRoom = catchAsync(async (req, res) => {
    const roomData = req.body;

    const result = await RoomServices.createRoomIntoDB(
        roomData
    );

    sendResponse(res, {
        message: 'Room added successfully',
        data: result,
    });
});

const getSingleRoom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomServices.getSingleRoomFromDB(id);
    sendResponse(res, {
        message: "Room retrieved successfully",
        data: result
    })
})

const getAllRooms = catchAsync(async (req, res) => {
    const result = await RoomServices.getAllRoomFromDB(req.query);
    sendResponse(res, {
        message: "Rooms retrieved successfully",
        data: result
    })
})

const updateRoom = catchAsync(async (req, res) => {
    const { roomId } = req.params;
    const result = await RoomServices.updateRoomIntoDB(roomId, req.body);
    sendResponse(res, {
        message: "Room updated successfully",
        data: result
    })
})

const deleteRoom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RoomServices.deleteRoomIntoDB(id);
    sendResponse(res, {
        message: "Room deleted successfully",
        data: result
    })
})

export const RoomControllers = {
    createRoom,
    getSingleRoom,
    getAllRooms,
    updateRoom,
    deleteRoom
}