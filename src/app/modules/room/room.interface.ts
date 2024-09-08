import { Model, Types } from "mongoose";
import { meetingRoomAmenities } from "./room.constant";

type TAmenities = keyof typeof meetingRoomAmenities

export interface TRoom {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: TAmenities[];
    isDeleted: boolean;
};

export interface RoomModel extends Model<TRoom> {
    isRoomExists(roomNo: number, floorNo: number): Promise<TRoom | null>;
    isRoomExistsById(id: Types.ObjectId): Promise<TRoom | null>;
}
