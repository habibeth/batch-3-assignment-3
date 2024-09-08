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
exports.SlotsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const room_model_1 = require("../room/room.model");
const slots_model_1 = require("./slots.model");
const slots_utils_1 = require("./slots.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const slots_constant_1 = require("./slots.constant");
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExists = yield room_model_1.Room.findById(payload.room);
    console.log(isRoomExists);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This room is not Found");
    }
    if (isRoomExists.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This room is not Available");
    }
    const startMinutes = (0, slots_utils_1.convertTimeToMinutes)(payload.startTime);
    const endMinutes = (0, slots_utils_1.convertTimeToMinutes)(payload.endTime);
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
        const convertedDate = dateFromPayload.toISOString().replace('Z', '+00:00');
        const startTime = `${startHour}:${startMinute}`;
        const endTime = `${endHour}:${endMinute}`;
        const isSlotsExists = yield slots_model_1.Slots.isSlotsExists(convertedDate, startTime);
        if (isSlotsExists) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This Slots is not Available");
        }
        const slot = {
            room: isRoomExists._id,
            date: payload.date,
            startTime,
            endTime,
        };
        slots.push(slot);
    }
    const result = yield slots_model_1.Slots.insertMany(slots);
    return result;
});
const getAllSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const SlotsQuery = new QueryBuilder_1.default(slots_model_1.Slots.find({ isBooked: false }).populate('room'), query)
        .search(slots_constant_1.SlotsSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield SlotsQuery.modelQuery;
    return result;
});
exports.SlotsServices = {
    createSlotsIntoDB,
    getAllSlotsFromDB
};
