'use server'
import { auth } from '@/auth'
import InstructorDashboard from '@/components/instructor-dashboard'



async function  page() {
    const session = await auth();
    const instructorName = session?.user?.fullname;
    console.log(instructorName);
    
  return (
    <InstructorDashboard name={instructorName as string} />
  )
}

export default page