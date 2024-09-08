"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("./booking.model");
const slots_model_1 = require("../Slots/slots.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const booking_constant_1 = require("./booking.constant");
const room_model_1 = require("../room/room.model");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, slots, user, room } = payload;
    const getDate = new Date(date);
    const convertedDate = getDate.toISOString().replace('Z', '+00:00');
    const isUserExists = yield user_model_1.User.findById(user);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User is Not Available!");
    }
    const isRoomExists = yield room_model_1.Room.isRoomExistsById(room);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This Room is Not Exist!");
    }
    const isSlotsAvailable = yield slots_model_1.Slots.find({ _id: { $in: slots }, isBooked: false, date: convertedDate });
    if (isSlotsAvailable.length !== slots.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Slot is Not Available!");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const totalAmount = isRoomExists.pricePerSlot * isSlotsAvailable.length;
        payload.totalAmount = totalAmount;
        const booking = yield booking_model_1.Booking.create([payload], { session });
        const slotUpdate = yield slots_model_1.Slots.updateMany({ _id: { $in: slots } }, { $set: { isBooked: true } }, { session });
        const result = yield booking_model_1.Booking.findById(booking[0]._id)
            .populate('slots')
            .populate('room')
            .populate('user')
            .session(session);
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const getAllBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.Booking.find()
        .populate('slots')
        .populate('room')
        .populate('user'), query)
        .search(booking_constant_1.BookingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield bookingQuery.modelQuery;
    return result;
});
const getMyBookingFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({ email });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User is Not Available!");
    }
    const result = yield booking_model_1.Booking.find({ user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id }).select('_id date slots room totalAmount isConfirmed isDeleted').populate('slots').populate('room');
    return result;
});
const updateBookingFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExists = yield booking_model_1.Booking.findById(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Booking is Not Available!");
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExists = yield booking_model_1.Booking.findById(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Booking is Not Available!");
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
        isDeleted: true
    }, {
        new: true,
        runValidators: true
    });
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getMyBookingFromDB,
    updateBookingFromDB,
    deleteBookingFromDB
};
