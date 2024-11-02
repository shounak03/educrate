'use client'
import { GraduationCap, Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function Appbar() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (

         <nav className="dark:bg-gray-900 border-b border-gray-800 px-4 py-3"> 
              <div className="container mx-auto flex ">
                    <Link className="flex items-center justify-center" href="#">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span className="ml-2 font-bold">EduCrate</span>
                    </Link>

                    <nav className="ml-auto flex gap-4 sm:gap-6">

                        <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="#">
                            Courses
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4 mt-2" href="#">
                            About
                        </Link>
                        <Button size={"sm"} variant={"outline"} className={"bg-primary text-primary-foreground hover:bg-white hover:text-black"}>
                            Register
                        </Button>
                    </nav>
                    <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
            </div>
         </nav>

    )
}
