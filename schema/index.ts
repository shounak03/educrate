import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password:z.string()
})
export const registerSchema = z.object({
    fullname: z.string(),
    email: z.string().email(),
    password:z.string().min(6,{message:"Password too short, minimum length: 6"}),
    role:z.string()
})