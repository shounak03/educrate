import { registerSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { User } from "@/models/user.model";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { data } = registerSchema.safeParse(req.body)
 

        if (!data?.fullname || !data?.email || !data?.password || !data?.role) {
            return NextResponse.json({ message: "Please fill all fields" },{status:200})
        }

        const hashedPassword = await bcrypt.hash(data?.password, 10);

        const user = await User.create({
            email: data?.email,
            fullname: data?.fullname,
            password: hashedPassword,
            role: data?.role
        })

        return NextResponse.json({ message: "User registered successfully" },{status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong",error },{status:500})
    }
}