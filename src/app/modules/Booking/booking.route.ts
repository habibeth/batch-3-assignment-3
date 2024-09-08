import { Router } from "express"
import validateRequest from "../../middleware/vaildRequest"
import { bookingValidationSchema } from "./booking.validation"
import { BookingControllers } from "./booking.controller"
import auth from "../../middleware/auth"
import { USER_ROLE } from "../user/user.constant"

const route = Router()

route.post(
    '/create-booking',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(bookingValidationSchema.createBookingValidationSchema),
    BookingControllers.createBooking
)

route.get(
    '/',
    auth(USER_ROLE.admin),
    BookingControllers.getAllBookings
)

route.put(
    '/:bookingId',
    auth(USER_ROLE.admin),
    BookingControllers.updateBookings
)

route.delete(
    '/:bookingId',
    auth(USER_ROLE.admin),
    BookingControllers.deleteBookings
)

export const BookingRouts = route