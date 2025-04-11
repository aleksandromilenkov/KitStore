import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {message:"Password must be at least 6 chars."})
})

export type LoginSchema = z.infer<typeof loginSchema>; // creating a type for this schema