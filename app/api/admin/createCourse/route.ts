import { auth } from "@/auth"
import { Course } from "@/models/courses.model"
import { CreateCourseSchema } from "@/schema"
import { NextRequest,NextResponse } from "next/server"

export const POST = async (req:NextRequest, res:NextResponse) => {
    const session = await auth()
    if(!session?.user?.id)
        return NextResponse.json({message:"User not found"},{status:404})
    try {

        const adminId = session?.user?.id;
        // const checkIfAdmin = await User.findOne({ _id: adminId, role: 'creator' }).select('_id');

        // if(!checkIfAdmin)
        //     return res.status(404).json({message:"Admin Authorized endpoint"})


        const { name, description,price,duration, thumbnail } = CreateCourseSchema.parse(req.body)

        if(!name ||  !description || !price || !duration || !thumbnail)
            return NextResponse.json({ message: "Please fill all fields" })

        const newCourse = await Course.create({
            creator:adminId,
            name,
            description,
            price,
            duration,
            thumbnail
        })
        NextResponse.json({newCourse,message:"Course Created successfully"},{status:200})
    } catch (error) {
        NextResponse.json({error:"Something went wrong"},{status:500})
    }
}
