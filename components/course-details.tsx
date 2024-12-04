'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, PlayCircle, Star, UserCircle, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Accordion } from '@radix-ui/react-accordion'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface courseData {
  name: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  creator: {
    fullname: string;
  };
  thumbnail: string;
  _id: string;

}

const courseData = {
  id: 1,
  title: "Advanced React Patterns and Best Practices",
  description: "Master advanced React concepts and patterns to build scalable and maintainable applications.",
  instructor: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?text=SJ",
    bio: "Senior React Developer with 10+ years of experience in building large-scale applications.",
  },
  rating: 4.8,
  studentsEnrolled: 1520,
  lastUpdated: "2024-03-15",
  language: "English",
  price: 129.99,
  duration: "6 weeks",
  level: "Advanced",
  prerequisites: ["Basic React knowledge", "JavaScript proficiency", "ES6+ features understanding"],
  whatYoullLearn: [
    "Advanced component patterns",
    "State management techniques",
    "Performance optimization",
    "Testing strategies for React applications",
    "Server-side rendering and Next.js",
    "Custom hooks and their applications",
  ],
  curriculum: [
    {
      title: "Introduction to Advanced React Patterns",
      lessons: [
        { title: "Course Overview", duration: "10:00" },
        { title: "Setting Up the Development Environment", duration: "15:00" },
      ],
    },
    {
      title: "Component Composition Patterns",
      lessons: [
        { title: "Compound Components", duration: "25:00" },
        { title: "Render Props Pattern", duration: "30:00" },
        { title: "Higher-Order Components (HOCs)", duration: "35:00" },
      ],
    },
    {
      title: "State Management Techniques",
      lessons: [
        { title: "Context API Deep Dive", duration: "40:00" },
        { title: "Redux vs. Context + Hooks", duration: "45:00" },
        { title: "Implementing a Custom State Management Solution", duration: "50:00" },
      ],
    },
    {
      title: "Performance Optimization",
      lessons: [
        { title: "React.memo and useMemo", duration: "30:00" },
        { title: "useCallback and Its Applications", duration: "35:00" },
        { title: "Code Splitting and Lazy Loading", duration: "40:00" },
      ],
    },
  ],
}



export default function CourseDetails({ courseId }: { courseId: string }) {


  const [data, setData] = useState<courseData[]>([])
  // const [moduleData, setModuleData] = useState([])



  const getCourseData = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/courseById?courseId=${courseId}`);
      const data = await response.json();
      setData(data);
      console.log(data.courseModules);
    } catch (error) {
      console.log(error);
    } finally {

    }
  }

  useEffect(() => {
    getCourseData(courseId);
  }, []);

  const pathname = usePathname()
  

  const isCourseDetailPage = pathname.startsWith('/courses/') 


  return (
    <div className="container mx-auto py-8">
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-5xl font-bold">{data?.course?.name}</h1>
          <p className="text-3xl text-gray-600 dark:text-gray-300">{data?.course?.description}</p>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">{"Intermediate"}</Badge>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{data?.course?.ratings?.length}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-1" />
              <span>{data?.enrolledStudents?.length || 0} students</span>
            </div>
          </div>
              <div className="flex">
                <span>Duration: </span>
                <span className="font-semibold px-2 mb-2">{data?.course?.duration} hours</span>
              </div>
                <span>Language:</span>
                <span className="font-semibold px-2">{"English"}</span>

          <div className="flex items-center space-x-4">
            <Avatar>
              <UserCircle className="w-10 h-10" />
            </Avatar>
            <div>
            <Link href={`/instructors/${data?.course?.creator?.fullname}`} className=" text-2xl hover:underline cursor-pointer capitalize">{data?.course?.creator?.fullname}</Link>
              <p className="text-gray-500 dark:text-gray-400">Instructor</p>
            </div>
          </div>
        </div>

        { isCourseDetailPage && <Card>
          <CardHeader>
                <Image
                  src={data?.course?.thumbnail && data?.course?.thumbnail.startsWith('http') ? data?.course.thumbnail : "/course.png"}
                  alt={data?.course?.name || "Course Thumbnnail"}
                  width={400}
                  height={200}
                  className="rounded-t-lg object-cover"
                  unoptimized={typeof data?.course?.thumbnail === 'string' && data?.course?.thumbnail.startsWith('http')}
                />
              </CardHeader>
          <CardHeader>
            <CardTitle className="text-2xl">₹ {data?.course?.price}</CardTitle>
            <CardDescription>Lifetime access</CardDescription>
            <CardDescription>Last Updated: {data?.course?.updatedAt.split('T')[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-4">Enroll Now</Button>
          </CardContent>
        </Card>}

      </div>

      { isCourseDetailPage && 
      
      <>
      <h1 className='text-3xl font-semibold mt-4'>What To Expect From This Course</h1>
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Content</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {courseData.whatYoullLearn.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {courseData.prerequisites.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum">
          <Card><CardHeader><CardTitle>Course Contents</CardTitle></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                
                {data?.courseModules?.length > 0 ? 
                
                  (data.courseModules.map((section, index) => (
                    <AccordionItem value={`section-${index}`} key={index}>
                      <AccordionTrigger>
                        {section.moduleTitle}
                      </AccordionTrigger>
                      <AccordionContent>
                      <p className='m-2'>{section.moduleDescription}</p>
                        <ul className="space-y-2 mt-2">
                          {section.lectures.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <PlayCircle className="w-5 h-5 mr-2 text-primary" />
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                            </li>
                          ))} 
                        </ul> 
                      </AccordionContent>
                    </AccordionItem>
                ))) : (
                 <AccordionContent>
                  <p>No content available</p>
                  </AccordionContent>
                )}

              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructor">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={courseData.instructor.avatar} alt={courseData.instructor.name} />
                  <AvatarFallback>{courseData.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className='capitalize'>{data?.course?.creator?.fullname}</CardTitle>
                  <CardDescription>Course Instructor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{courseData.instructor.bio}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
              <CardDescription>Course rating: {data?.course?.ratings?.length} / 5</CardDescription>
            </CardHeader>
            {data?.course?.reviews?.length > 0 ? (
              data.course.reviews.map((review: string, i: number) => (
                <CardContent key={i}>
                  <p>{review}</p>
                </CardContent>
              ))
              ) : (
              <CardContent>
                <p>No reviews yet</p>
              </CardContent>
            )}

          </Card>
        </TabsContent>
      </Tabs>
      </>
      }

    </div>
  )
}
