"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = require("express");
const room_controller_1 = require("./room.controller");
const vaildRequest_1 = __importDefault(require("../../middleware/vaildRequest"));
const room_validation_1 = require("./room.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const route = (0, express_1.Router)();
route.post('/create-room', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, vaildRequest_1.default)(room_validation_1.RoomValidationSchema.createRoomValidationSchema), room_controller_1.RoomControllers.createRoom);
route.get('/:id', room_controller_1.RoomControllers.getSingleRoom);
route.get('/', room_controller_1.RoomControllers.getAllRooms);
route.put('/:roomId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, vaildRequest_1.default)(room_validation_1.RoomValidationSchema.updateRoomValidationSchema), room_controller_1.RoomControllers.updateRoom);
route.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), room_controller_1.RoomControllers.deleteRoom);
exports.RoomRoutes = route;
