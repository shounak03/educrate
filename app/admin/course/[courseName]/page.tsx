
const Page = ({ params: { courseName } }: { params: { courseName: string } }) => {
    return (
        <div>
            <h1>Course: {courseName}</h1>
        </div>
    )
}

export default Page