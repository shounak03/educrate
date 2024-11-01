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
export const CreateCourseSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    thumbnail: z.string()
})
export const courseContentSchema = z.object({
    lectures: z.string(),
    docx: z.string()
})