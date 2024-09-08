import { z } from 'zod';

const createSlotsValidationSchema = z.object({
    body: z.object({
        room: z.string(),
        date: z.string(),
        startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
        endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
        isBooked: z.boolean().optional(),
    })
});

export const SlotsValidation = {
    createSlotsValidationSchema
};
