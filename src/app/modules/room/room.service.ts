import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RoomSearchableFields } from "./room.constant";

const createRoomIntoDB = async (payload: TRoom) => {
    const roomIsExists = await Room.isRoomExists(payload.roomNo, payload.floorNo);
    if (roomIsExists) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This Room is Already Exists!')
    }
    const result = await Room.create(payload);
    return result;
}

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id)
    return result;
}

const getAllRoomFromDB = async (query: Record<string, unknown>) => {
    const roomQuery = new QueryBuilder(Room.find(), query)
        .search(RoomSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await roomQuery.modelQuery;

    return result
}


const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
    const result = await Room.findByIdAndUpdate(id, payload, {
        new: true
    })
    return result;
}

const deleteRoomIntoDB = async (id: string) => {
    const result = await Room.findOneAndUpdate({
        _id: id
    }, {
        isDeleted: true,
    }, {
        new: true
    })
    return result;
}



export const RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomIntoDB,
    deleteRoomIntoDB
}