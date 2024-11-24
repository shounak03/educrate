
const Page = ({ params: { courseId } }: { params: { courseId: string } }) => {
    return (
        <div>
            <h1>Course: {courseId}</h1>
        </div>
    )
}

export default Page