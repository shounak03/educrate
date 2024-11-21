
import AddContent from "@/components/add-content"
import CreateCourse from "@/components/create-course"
import { Button } from "@/components/ui/button"


export default function Page() {
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Course</h1>
      <CreateCourse/>
      {/* <AddContent/> */}
      
    </div>
  )
}