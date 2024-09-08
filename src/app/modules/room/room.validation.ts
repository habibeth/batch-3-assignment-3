import { z } from "zod";
import { meetingRoomAmenities } from "./room.constant";

const createRoomValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        roomNo: z.number(),
        floorNo: z.number(),
        capacity: z.number(),
        pricePerSlot: z.number(),
        amenities: z.array(z.enum([...meetingRoomAmenities] as [string, ...string[]])),
    })
});


const updateRoomValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        roomNo: z.number().optional(),
        floorNo: z.number().optional(),
        capacity: z.number().optional(),
        pricePerSlot: z.number().optional(),
        amenities: z.array(z.enum([...meetingRoomAmenities] as [string, ...string[]])).optional(),
    })
});


export const RoomValidationSchema = {
    createRoomValidationSchema,
    updateRoomValidationSchema
}