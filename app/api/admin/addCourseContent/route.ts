import { Course } from "@/models/courses.model";
import { courseContentSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest, res:NextResponse) => {
    try {
        const courseId = req.nextUrl.searchParams.get("CourseId")
        if(!courseId)
            return NextResponse.json({success:false,message:"CourseId is required"},{status:400})
        
        const course = await Course.findById(courseId);
        if(!course)
            return NextResponse.json({success:false,message:"Course not found"},{status:404})
        
        const {lectures,docx} = courseContentSchema.parse(req.body)
        
        if(!lectures)
            return NextResponse.json({success:false,message:"Please fill all fields"},{status:400})

        const newContent = {
            videoLecture: lectures,
            documentation: docx
        };


        await Course.findByIdAndUpdate(
            courseId,
            { $push: { contents: newContent } },
            { new: true } 
        );
        NextResponse.json({success:true,message:"course content updated"},{status:200})

    } catch (error) {
        console.log(error);
        NextResponse.json({success:false,error:"Something went wrong"},{status:500})
    }
}