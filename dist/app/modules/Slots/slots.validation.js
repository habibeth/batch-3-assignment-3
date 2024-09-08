"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsValidation = void 0;
const zod_1 = require("zod");
const createSlotsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string(),
        date: zod_1.z.string(),
        startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
        endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
        isBooked: zod_1.z.boolean().optional(),
    })
});
exports.SlotsValidation = {
    createSlotsValidationSchema
};
