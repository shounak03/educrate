import CourseDetails from "@/components/course-details"

const Page = ({ params: { courseName } }: { params: { courseName: string } }) => {
    return (
        <div>
            <CourseDetails name={courseName as string} />
        </div>
    )
}

export default Page