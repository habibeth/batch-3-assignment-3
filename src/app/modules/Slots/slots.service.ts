import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../room/room.model";
import { TSlots } from "./slots.interface";
import { Slots } from "./slots.model";
import { convertTimeToMinutes } from "./slots.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { SlotsSearchableFields } from "./slots.constant";

const createSlotsIntoDB = async (payload: TSlots) => {
    const isRoomExists = await Room.findById(payload.room);
    console.log(isRoomExists)
    if (!isRoomExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "This room is not Found");
    }
    if (isRoomExists.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "This room is not Available");
    }

    const startMinutes = convertTimeToMinutes(payload.startTime);
    const endMinutes = convertTimeToMinutes(payload.endTime);
    const totalSlots = (endMinutes - startMinutes) / 60;

    const slots = [];

    for (let i = 0; i < totalSlots; i++) {
        const slotStartTime = startMinutes + i * 60;
        const slotEndTime = slotStartTime + 60;

        const startHour = Math.floor(slotStartTime / 60).toString().padStart(2, '0');
        const startMinute = (slotStartTime % 60).toString().padStart(2, '0');
        const endHour = Math.floor(slotEndTime / 60).toString().padStart(2, '0');
        const endMinute = (slotEndTime % 60).toString().padStart(2, '0');

        const dateFromPayload = new Date(payload.date);
        const convertedDate: any = dateFromPayload.toISOString().replace('Z', '+00:00');

        const startTime = `${startHour}:${startMinute}`
        const endTime = `${endHour}:${endMinute}`

        const isSlotsExists = await Slots.isSlotsExists(convertedDate, startTime);

        if (isSlotsExists) {
            throw new AppError(httpStatus.BAD_REQUEST, "This Slots is not Available");
        }

        const slot = {
            room: isRoomExists._id,
            date: payload.date,
            startTime,
            endTime,
        };

        slots.push(slot);
    }


    const result = await Slots.insertMany(slots);
    return result;
}


const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
    const SlotsQuery = new QueryBuilder(Slots.find({ isBooked: false }).populate('room'), query)
        .search(SlotsSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await SlotsQuery.modelQuery;

    return result
}


export const SlotsServices = {
    createSlotsIntoDB,
    getAllSlotsFromDB
}