import { connectDB } from "@/lib/dbConnect";
import {Course}  from "@/models/courses.model"; 
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    res: NextResponse,) => {
    try {
        connectDB();
        const courses = await Course.aggregate([
            {
                // Calculate the average rating for each course
                $addFields: {
                    averageRating: {
                        $avg: "$ratings.rating"
                    },
                    enrolledStudentCount: {
                        $size: "$enrolledStudents"
                    }
                }
            },
            {
                // Populate the creator field with only the `fullname`
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            {
                $unwind: "$creator"    // Convert the creator array to a single object
            },
            {
                // Project only the necessary fields
                $project: {
                    name: 1,
                    description: 1,
                    enrolledStudentCount: 1,
                    price: 1,
                    "creator.fullname": 1, // Only include creator's name
                    duration: 1,
                    thumbnail: 1,
                    averageRating: 1
                }
            },
            {
                $sort: {
                    averageRating: -1
                }
            }
        ]);

        return NextResponse.json({success:true,courses,message:"all courses fetched"},{status:200})
    } catch (error) {
        console.log("Error fetching courses:", error);
        return NextResponse.json({success:false,message:"Error fetching courses"},{status:500})
    }
};