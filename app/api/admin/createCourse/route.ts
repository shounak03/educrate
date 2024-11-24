import { auth } from "@/auth"
import { connectDB } from "@/lib/dbConnect"
import { Course } from "@/models/courses.model"
import { CreateCourseSchema } from "@/schema"
import { NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary } from "@/utils/cloudinary"


export const POST = async (req: NextRequest, res: NextResponse) => {
    connectDB()
    const session = await auth()
    if (!session?.user?.id)
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    
    try {
        const formData = await req.formData();
        const adminId = session?.user?.id;

        // Get file from form data
        const thumbnailFile = formData.get('thumbnail') as File;
        if (!thumbnailFile) {
            return NextResponse.json({ success: false, message: "Thumbnail is required" }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await thumbnailFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${thumbnailFile.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const thumbnailUrl = await uploadToCloudinary(base64Image);

        // Get other form data
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = Number(formData.get('price'));
        const duration = Number(formData.get('duration'));

        // Validate data
        const courseData = {
            name,
            description,
            price,
            duration,
            thumbnail: thumbnailUrl
        };

        CreateCourseSchema.parse(courseData);

        if (!name || !description || !price || !duration || !thumbnailUrl)
            return NextResponse.json({ success: false, message: "Please fill all fields" }, { status: 400 })

        const newCourse = await Course.create({
            creator: adminId,
            ...courseData
        });

        return NextResponse.json({ 
            success: true, 
            newCourse,
            courseId : newCourse._id,
            message: "Course Created successfully" 
        }, { status: 200 });

    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json({ 
            success: false, 
            error: "Something went wrong" 
        }, { status: 500 });
    }
}
