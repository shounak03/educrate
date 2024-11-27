import AddContent from '@/components/add-content'
import CourseDetails from '@/components/course-details'
import React from 'react'

const Page = ({ params: { courseId } }: { params: { courseId: string } }) => {
  return (
    <div className='mb-4'>
        <CourseDetails courseId={courseId as string} />
        <AddContent courseId={courseId as string} />
    </div>
  )
}

export default Page