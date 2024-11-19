import CourseDetails from "@/components/course-details"

const Page = ({ params: { courseId } }: { params: { courseId: object } }) => {
    return (
        <div>
            <CourseDetails courseId={courseId as object} />
        </div>
    )
}

export default Page