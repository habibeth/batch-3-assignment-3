import { Model, Types } from "mongoose";

export type TSlots = {
    room: Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}


export interface SlotsModel extends Model<TSlots> {
    isSlotsExists(date: Date, startTime: string): Promise<TSlots | null>;
}