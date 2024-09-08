"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidationSchema = void 0;
const zod_1 = require("zod");
const room_constant_1 = require("./room.constant");
const createRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        roomNo: zod_1.z.number(),
        floorNo: zod_1.z.number(),
        capacity: zod_1.z.number(),
        pricePerSlot: zod_1.z.number(),
        amenities: zod_1.z.array(zod_1.z.enum([...room_constant_1.meetingRoomAmenities])),
    })
});
const updateRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        roomNo: zod_1.z.number().optional(),
        floorNo: zod_1.z.number().optional(),
        capacity: zod_1.z.number().optional(),
        pricePerSlot: zod_1.z.number().optional(),
        amenities: zod_1.z.array(zod_1.z.enum([...room_constant_1.meetingRoomAmenities])).optional(),
    })
});
exports.RoomValidationSchema = {
    createRoomValidationSchema,
    updateRoomValidationSchema
};
