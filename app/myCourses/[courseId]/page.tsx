import {CourseContent} from "@/components/course-content"


const Page = async({ params }) => {
    const {courseId} = await params
    return (
        <div>
            <CourseContent params={Promise.resolve({ courseId })} />
        </div>
    )
}

export default Page