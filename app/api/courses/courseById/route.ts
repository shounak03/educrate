import { CourseContent } from "@/models/courseContent.model";
import { Course } from "@/models/courses.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,res:NextResponse) => {
    try {
        const courseId = req.nextUrl.searchParams.get("courseId");

        console.log("id - ", courseId);
        
        if (!courseId) {
            return NextResponse.json({ success: false, message: 'Course ID is required' }, { status: 400 });
        }

        const coursebyId = await Course.findById(courseId)
            .populate({
                path: 'creator',
                select: 'fullname email' 
            })
            .lean(); 
        

        const courseContent = await CourseContent.findOne({ course: courseId });
        const courseModules = courseContent ? courseContent.modules : [];

        return NextResponse.json({
            success: true, 
            course: coursebyId, 
            courseModules
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success: false, 
            message: "Something went wrong", 
            error
        }, { status: 404 });
    }
}