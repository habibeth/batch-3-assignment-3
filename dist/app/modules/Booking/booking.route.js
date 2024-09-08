"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouts = void 0;
const express_1 = require("express");
const vaildRequest_1 = __importDefault(require("../../middleware/vaildRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const route = (0, express_1.Router)();
route.post('/create-booking', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), (0, vaildRequest_1.default)(booking_validation_1.bookingValidationSchema.createBookingValidationSchema), booking_controller_1.BookingControllers.createBooking);
route.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.getAllBookings);
route.put('/:bookingId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.updateBookings);
route.delete('/:bookingId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.deleteBookings);
exports.BookingRouts = route;
