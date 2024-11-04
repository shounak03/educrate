'use server'
import { GraduationCap } from 'lucide-react'

import { Button } from './ui/button'
import Link from 'next/link'
import { auth } from '@/auth';

export default async function Appbar() {

    const session = await auth();
    console.log("session = ", session);
    const user = session?.user?.id;

    return (

        <nav className="dark:bg-gray-900 border-b border-gray-800 px-4 py-3">
            <div className="container mx-auto flex ">
                <Link className="flex items-center justify-center" href="/">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="ml-2 font-bold">EduCrate</span>
                </Link>

                <nav className="ml-auto flex gap-4 sm:gap-6">

                    <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="/courses">
                        Courses
                    </Link>

                    {user ? (
                        <Link href="/auth/register">
                            <Button size={"sm"} variant={"outline"} className={"bg-primary text-primary-foreground hover:bg-white hover:text-black"}>
                                Logout
                            </Button>
                        </Link>
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
