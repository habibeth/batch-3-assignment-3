import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: true
    },
    slots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
            required: true
        }
    ],
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalAmount: {
        type: Number,
    },
    isConfirmed: {
        type: String,
        default: "unconfirmed"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
})




export const Booking = mongoose.model<TBooking>('Booking', bookingSchema)