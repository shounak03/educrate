"use server"
import CourseDetails from "@/components/course-details"


  
  const Page = async({ params }) => {
    const {courseId} = await params
    return (
        <div>
            <CourseDetails courseId={courseId as string} />
        </div>
    )
}

export default Page