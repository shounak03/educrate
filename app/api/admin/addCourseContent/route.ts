import { Course } from "@/models/courses.model";
import { courseContentSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest, res:NextResponse) => {
    try {
        const courseId = req.nextUrl.searchParams.get("CourseId")
        if(!courseId)
            return NextResponse.json({message:"CourseId is required"})
        
        const course = await Course.findById(courseId);
        if(!course)
            return NextResponse.json({message:"Course not found"})
        
        const {lectures,docx} = courseContentSchema.parse(req.body)
        
        if(!lectures)
            return NextResponse.json({message:"Please fill all fields"})

        const newContent = {
            videoLecture: lectures,
            documentation: docx
        };


        await Course.findByIdAndUpdate(
            courseId,
            { $push: { contents: newContent } },
            { new: true } 
        );
        NextResponse.json({message:"course content updated"})

    } catch (error) {
        console.log(error);
        NextResponse.json({error:"Something went wrong"})
    }
}