import { model, Schema } from "mongoose";
import { SlotsModel, TSlots } from "./slots.interface";

const slotsSchema = new Schema<TSlots, SlotsModel>({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
});


slotsSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } })

    next()
})

slotsSchema.statics.isSlotsExists = async function (date: Date, startTime: string) {
    const existingSlots = await Slots.findOne({ date, startTime });
    return existingSlots;
};

export const Slots = model<TSlots, SlotsModel>("Slot", slotsSchema)