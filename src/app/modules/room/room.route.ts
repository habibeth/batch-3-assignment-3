import { Router } from "express";
import { RoomControllers } from "./room.controller";
import validateRequest from "../../middleware/vaildRequest";
import { RoomValidationSchema } from "./room.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";



const route = Router();

route.post(
    '/create-room',
    auth(USER_ROLE.admin),
    validateRequest(RoomValidationSchema.createRoomValidationSchema),
    RoomControllers.createRoom
)

route.get(
    '/:id',
    RoomControllers.getSingleRoom
)
route.get(
    '/',
    RoomControllers.getAllRooms
)

route.put(
    '/:roomId',
    auth(USER_ROLE.admin),
    validateRequest(RoomValidationSchema.updateRoomValidationSchema),
    RoomControllers.updateRoom
)

route.delete(
    '/:id',
    auth(USER_ROLE.admin),
    RoomControllers.deleteRoom
)




export const RoomRoutes = route