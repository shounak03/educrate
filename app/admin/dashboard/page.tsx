'use server'
import { auth } from '@/auth'
import InstructorDashboard from '@/components/instructor-dashboard'
import { Session } from 'inspector/promises'


async function  page() {
    const session = await auth();
    const instructorName = session?.user?.name;
    console.log(session);
    
  return (
    <InstructorDashboard name={instructorName as string} />
  )
}

export default page