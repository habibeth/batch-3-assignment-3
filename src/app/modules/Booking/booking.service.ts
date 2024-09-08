import mongoose, { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slots } from "../Slots/slots.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { BookingSearchableFields } from "./booking.constant";
import { Room } from "../room/room.model";

const createBookingIntoDB = async (payload: TBooking) => {
    const { date, slots, user, room } = payload;

    const getDate = new Date(date);
    const convertedDate: any = getDate.toISOString().replace('Z', '+00:00');

    const isUserExists = await User.findById(user);

    if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "This User is Not Available!")
    }

    const isRoomExists = await Room.isRoomExistsById(room)
    if (!isRoomExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "This Room is Not Exist!")
    }

    const isSlotsAvailable = await Slots.find({ _id: { $in: slots }, isBooked: false, date: convertedDate });
    if (isSlotsAvailable.length !== slots.length) {
        throw new AppError(httpStatus.NOT_FOUND, "This Slot is Not Available!")
    }



    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const totalAmount = isRoomExists.pricePerSlot * isSlotsAvailable.length;

        payload.totalAmount = totalAmount

        const booking = await Booking.create([payload], { session });

        const slotUpdate = await Slots.updateMany(
            { _id: { $in: slots } },
            { $set: { isBooked: true } },
            { session }
        )

        const result = await Booking.findById(booking[0]._id)
            .populate('slots')
            .populate('room')
            .populate('user')
            .session(session)


        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
}


const getAllBookingFromDB = async (query: Record<string, unknown>) => {
    const bookingQuery = new QueryBuilder(Booking.find()
        .populate('slots')
        .populate('room')
        .populate('user')
        , query)
        .search(BookingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await bookingQuery.modelQuery;

    return result
}


const getMyBookingFromDB = async (email: any) => {
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "This User is Not Available!")
    }
    const result = await Booking.find({ user: isUserExists?._id }).select('_id date slots room totalAmount isConfirmed isDeleted').populate('slots').populate('room')

    return result;
}

const updateBookingFromDB = async (id: string, payload: Record<string, unknown>) => {
    const isBookingExists = await Booking.findById(id);
    if (!isBookingExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This Booking is Not Available!")
    }
    const result = await Booking.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
}

const deleteBookingFromDB = async (id: string) => {
    const isBookingExists = await Booking.findById(id);
    if (!isBookingExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This Booking is Not Available!")
    }
    const result = await Booking.findByIdAndUpdate(
        id,
        {
            isDeleted: true
        },
        {
            new: true,
            runValidators: true
        }
    );
    return result;
}

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getMyBookingFromDB,
    updateBookingFromDB,
    deleteBookingFromDB
}