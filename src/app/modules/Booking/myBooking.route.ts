import { Router } from "express"
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { BookingControllers } from "./booking.controller";

const route = Router();

route.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.user),
    BookingControllers.getMyBookings
)

export const MyBookingRoutes = route