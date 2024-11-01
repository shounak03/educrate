import { auth } from "@/auth";
import { Course } from "@/models/courses.model";
import { courseContentSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";


export const Get =async (req:NextRequest, res:NextResponse) => {

    const session = await auth();
    if(!session?.user?.id)
        return NextResponse.json({message:"User not found"},{status:404})
    try {

        const adminId = session?.user?.id;
        
        const course = await Course.find({ creator: adminId })

        if(!course)
            return NextResponse.json({success:false,message:"Course not found"},{status:404})

        const courses = await Course.find({ creator: adminId })
            .populate({
                path: 'creator',
                select: 'fullname' 
            })

            return NextResponse.json({success:false,message:"Course not found"},{status:404})
        
    } catch (error) {
        return NextResponse.json({success:false, error:"Something went wrong"},{status:500})
    }
}