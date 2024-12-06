import { auth } from "@/auth";
import { Course } from "@/models/courses.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {

    const session = await auth();
    if(!session?.user?.id)
        return NextResponse.json({success:false,message:"You must be logged in to purchase a course"},{status:400})

    try {

        const courseId = req.nextUrl.searchParams.get("courseId");
        const userId = session.user.id;
        if(!userId) {
            return NextResponse.json({success:false,message:"User ID is required"},{status:400})
        }
        const user = await User.findById(userId)

        if(!user) {
            return NextResponse.json({success:false,message:"User not found"},{status:404})
        }

        
        
        if(!courseId) {
            return NextResponse.json({success:false,message:"Course ID is required"},{status:400})
        }

        const course = await Course.findById(courseId);

        if(!course) {
            return NextResponse.json({success:false,message:"Course not found"},{status:404})
        }
        await User.findByIdAndUpdate(userId,{
            $push:{
                purchasedCourses:{
                    course:courseId,
                    price:course.price,
                    purchaseDate:Date.now()
                }
            }
        })

        await Course.findByIdAndUpdate(courseId,{
            $push:{
                enrolledStudents:userId
            }
        })

        return NextResponse.json({success:true,message:"Course purchased successfully"},{status:200})


    }catch(error) {
        return NextResponse.json({success:false,message:"Course ID is required"},{status:400})
    }
}