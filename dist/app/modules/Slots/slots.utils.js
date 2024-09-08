"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToMinutes = void 0;
const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};
exports.convertTimeToMinutes = convertTimeToMinutes;
