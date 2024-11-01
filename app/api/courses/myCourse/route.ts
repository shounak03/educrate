import { auth } from "@/auth";
import { User } from "@/models/user.model";
import { NextResponse , NextRequest} from "next/server";

export const getMyCourses = async(req:NextRequest,res:NextResponse) => {

    const session = await auth();
    if(!session?.user?.id)
        return NextResponse.json({success:false, message:"You must be logged in"},{status:400})
    try {
        //@ts-ignore
        const userId = session.user._id;
        if(!userId) {
            return NextResponse.json({success:false,message:"User ID is required"},{status:404})
        }
        const user = await User.findById(userId)
        if(!user) {
            return NextResponse.json({success:false,message:"User not found"},{status:404})
        }

        const userCourses = await User.findById(userId)
            .populate({
                path: 'purchasedCourses.course',
                select: 'name description price duration thumbnail'
            })
            .select('purchasedCourses');

        return NextResponse.json({success:true,userCourses},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching courses"},{status:500})
    }
}