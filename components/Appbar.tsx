
import { GraduationCap } from 'lucide-react'

import { Button } from './ui/button'
import Link from 'next/link'
import { auth, signOut } from '@/auth';
import { toast } from 'sonner';
import { Router } from 'next/router';

interface users {
    role: string
}
export default async function Appbar() {

    const session = await auth();

    const user = session?.user?.id;
    const userRole = session?.user?.role


    return (

        <nav className="dark:bg-gray-900 border-b border-gray-800 px-4 py-3">
            <div className="container mx-auto flex ">
                <Link className="flex items-center justify-center" href="/">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="ml-2 font-bold">eduCrate</span>
                </Link>

                <nav className="ml-auto flex gap-4 sm:gap-6">

                    <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="/courses">
                        Courses
                    </Link>

                    {user ? (
                        userRole === 'creator' ? (
                            <>
                                <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="/admin/dashboard">
                                    Dashboard
                                </Link>
                                <form
                                    action={async () => {
                                        "use server"
                                        await signOut({redirectTo: '/'})
                                        toast.success("Logged-Out Successfully")
                                    }}
                                >
                                    <Button size={"sm"} type='submit' variant={"outline"} className={"bg-primary text-primary-foreground hover:bg-white hover:text-black"}>
                                        Logout
                                    </Button>
                                </form>

                            </>
                        ) : (
                            <>
                                <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="/myCourses">
                                    My Courses
                                </Link>
                                <form
                                action={async () => {
                                    "use server"
                                    await signOut({redirectTo: '/'})
                                    toast.success("Logged-Out Successfully")
                                }}
                                >

                                    <Button size={"sm"} type='submit' variant={"outline"} className={"bg-primary text-primary-foreground hover:bg-white hover:text-black"}>
                                        Logout
                                    </Button>


                            </form>
                            
                            </>
                        )

                    ) : (<>
                        <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="/about">
                            About
                        </Link>
                        <Link href="/auth/login">
                            <Button size={"sm"} variant={"outline"} className={"bg-primary text-primary-foreground hover:bg-white hover:text-black"}>
                                Login
                            </Button>
                        </Link>
                    </>
                    )}

                </nav>
            </div>
        </nav>

    )
}
