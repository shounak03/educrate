
import { connectDB } from "@/lib/dbConnect";
import { Course } from "@/models/courses.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,res:NextResponse) => {
    
    try {
        await connectDB();
        const courseId = req.nextUrl.searchParams.get("courseId");
        // console.log(courseId);
        
        if(!courseId)
            return NextResponse.json({success:false,message:"Course ID is required"},{status:400})
        
        console.log("test 1");
        
        const course = await Course.findById(courseId)
        // console.log(course);
        
        if(!course)
            return NextResponse.json({success:false,message:"Course not found"},{status:404})

        const coursebyId = await Course.findById(courseId)
            .populate({
                path: 'creator',
                select: 'fullname email' 
            })
            .lean(); 

        // if (course) {
        //     // Add the enrolled students count to the course data
        //     course.enrolledStudentCount = course.enrolledStudents.length;
        //     // Remove the enrolledStudents array to keep only the count
        //     delete course.enrolledStudents;
        // }

        return NextResponse.json({sucess:true,course:coursebyId},{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({success:false,message:"Something went wrong",error},{status:404})
    }
}
