import mongoose, { Schema } from "mongoose";
import { RoomModel, TRoom } from "./room.interface";
import { meetingRoomAmenities } from "./room.constant";



const roomSchema = new Schema<TRoom, RoomModel>({
    name: {
        type: String,
        required: true,
    },
    roomNo: {
        type: Number,
        required: true,
    },
    floorNo: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    pricePerSlot: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        enum: meetingRoomAmenities
    },
    isDeleted: {
        type: Boolean,
    },
})


roomSchema.statics.isRoomExists = async function (roomNo: number, floorNo: number) {
    const existingRoom = await Room.findOne({ roomNo, floorNo });
    return existingRoom;
};

roomSchema.statics.isRoomExistsById = async function (id: Schema.Types.ObjectId) {
    const existingRoomById = await Room.findOne({ _id: id });
    return existingRoomById;
};

export const Room = mongoose.model<TRoom, RoomModel>('Room', roomSchema)