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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slots = void 0;
const mongoose_1 = require("mongoose");
const slotsSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
});
slotsSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
slotsSchema.statics.isSlotsExists = function (date, startTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingSlots = yield exports.Slots.findOne({ date, startTime });
        return existingSlots;
    });
};
exports.Slots = (0, mongoose_1.model)("Slot", slotsSchema);
