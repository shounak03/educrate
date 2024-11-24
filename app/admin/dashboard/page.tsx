'use server'
import { auth } from '@/auth'
import InstructorDashboard from '@/components/instructor-dashboard'



async function  page() {
    const session = await auth();
    const instructorId = session?.user?.id;
    // console.log(session);
    
  return (
    <InstructorDashboard creatorId={instructorId as string} />
  )
}

export default page