import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        phone: z.string(),
        address: z.string(),
        role: z.enum(['admin', 'user'] as [string, ...string[]]),
    })
})


export const UserValidation = {
    createUserValidationSchema
}