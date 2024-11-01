'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, LayoutDashboard, Moon, Star, Sun, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Component() {
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold">EduCrate</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Courses
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height={550}
                src="/course.png"
                width={550}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Learn Anything, Anytime with EduCrate
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Unlock your potential with our diverse range of online courses. Learn from industry experts and
                    advance your career at your own pace.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Browse Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose EduCrate?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <BookOpen className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Diverse Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access a wide range of courses across various disciplines and skill levels.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Expert Instructors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Learn from industry professionals and experienced educators.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <LayoutDashboard className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Flexible Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Study at your own pace with on-demand video lectures and resources.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <Star className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Earn recognized certificates upon successful course completion.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-900">
                <Image
                  alt="Course thumbnail"
                  className="aspect-video object-cover rounded-t-lg"
                  height={200}
                  src="/placeholder.svg"
                  width={400}
                />
                <CardHeader>
                  <CardTitle>Introduction to Machine Learning</CardTitle>
                  <CardDescription>Learn the fundamentals of ML algorithms and applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">8 weeks • Beginner</p>
                  <Button 
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                      $99.99
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                      Enroll Now
                    </span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <Image
                  alt="Course thumbnail"
                  className="aspect-video object-cover rounded-t-lg"
                  height={200}
                  src="/placeholder.svg"
                  width={400}
                />
                <CardHeader>
                  <CardTitle>Web Development Bootcamp</CardTitle>
                  <CardDescription>Master HTML, CSS, and JavaScript to build modern websites.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">12 weeks • Intermediate</p>
                  <Button 
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                      $149.99
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                      Enroll Now
                    </span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <Image
                  alt="Course thumbnail"
                  className="aspect-video object-cover rounded-t-lg"
                  height={200}
                  src="/placeholder.svg"
                  width={400}
                />
                <CardHeader>
                  <CardTitle>Digital Marketing Essentials</CardTitle>
                  <CardDescription>Learn to create and execute effective digital marketing strategies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">6 weeks • Beginner</p>
                  <Button 
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                      $79.99
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                      Enroll Now
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Students Say</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Sarah M.</CardTitle>
                  <CardDescription>Web Development Graduate</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    "EduCrate's Web Development Bootcamp was a game-changer for my career. The instructors were
                    knowledgeable and supportive, and the hands-on projects gave me the confidence to land my dream
                    job."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>John D.</CardTitle>
                  <CardDescription>Data Science Enthusiast</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    "The Machine Learning course on EduCrate was exactly what I needed to transition into the field of
                    data science. The course material was comprehensive and up-to-date with industry standards."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Emily R.</CardTitle>
                  <CardDescription>Small Business Owner</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    "As a small business owner, the Digital Marketing Essentials course provided me with valuable
                    insights and practical strategies to grow my online presence. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Your Learning Journey Today</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of learners who have transformed their careers with EduCrate. Sign up now and get
                  access to our vast library of courses.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
                </form>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 EduCrate. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}