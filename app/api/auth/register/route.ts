import { registerSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import  User  from "@/models/user.model";
import {connectDB} from "@/lib/dbConnect";


export async function POST  (req: Request) {
    try {
        await connectDB();
        
        const body = await req.json();
        
        console.log(body);
    
        const { email, password, fullname, role } = registerSchema.parse(body);

        if (!email || !password || !fullname || !role) {
            return NextResponse.json({ message: "Please fill all fields" },{status:400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            fullname: fullname,
            password: hashedPassword,
            role: role
        })

        return NextResponse.json({user, message: "User registered successfully" },{status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong",error },{status:500})
    }
}