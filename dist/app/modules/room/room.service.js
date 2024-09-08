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
exports.RoomServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const room_model_1 = require("./room.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const room_constant_1 = require("./room.constant");
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const roomIsExists = yield room_model_1.Room.isRoomExists(payload.roomNo, payload.floorNo);
    if (roomIsExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This Room is Already Exists!');
    }
    const result = yield room_model_1.Room.create(payload);
    return result;
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findById(id);
    return result;
});
const getAllRoomFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const roomQuery = new QueryBuilder_1.default(room_model_1.Room.find(), query)
        .search(room_constant_1.RoomSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield roomQuery.modelQuery;
    return result;
});
const updateRoomIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
const deleteRoomIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findOneAndUpdate({
        _id: id
    }, {
        isDeleted: true,
    }, {
        new: true
    });
    return result;
});
exports.RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomIntoDB,
    deleteRoomIntoDB
};
