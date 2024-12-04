import CourseDetails from "@/components/course-details"

const Page = ({ params: { courseId } }: { params: { courseId: string } }) => {
    return (
        <div>
            <CourseDetails courseId={courseId as string} />
        </div>
    )
}

export default Page