'use server'

import { auth } from "@/auth"
import CreateCourse from "@/components/create-course"



export default async function Page() {
  const session = await auth()
  const id = session?.user?.id

  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Course</h1>

      <CreateCourse adminId={id as string}/> 

    </div>
  )
}