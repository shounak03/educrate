import {CourseContent} from "@/components/course-content"


const Page = ({ params: { courseId } }: { params: { courseId: string } }) => {
    return (
        <div>
            <CourseContent params={Promise.resolve({ courseId })} />
        </div>
    )
}

export default Page