'use server'
import AddContent from '@/components/add-content'
import CourseDetails from '@/components/course-details'
import React from 'react'

const Page = async({ params }:any) => {
  const {courseId} =  params

  return (
    <div className='mb-4'>
      <CourseDetails courseId={courseId} />
      <AddContent courseId={courseId} />
    </div>
  );
};

export default Page;
