'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"




interface CourseData {
  course: {
    name: string;
    description: string;
    duration: number;
    price: number;
    thumbnail: string;
    _id: string;
  };
}

interface ApiResponse {
  success: boolean;
  userCourses: {
    purchasedCourses: CourseData[];
  };
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [courses, setCourses] = useState<CourseData[]>([])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/myCourse');
      const data: ApiResponse = await response.json();
      console.log('Raw API response:', data);
      return data.userCourses.purchasedCourses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  useEffect(() => {
    const getCourses = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    };

    getCourses();
  }, []);

  return (
    <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Here are your purchased courses...</h1>

      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-8"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No courses found 
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((courseData) => {
            const course = courseData.course; // Access the nested course data
            return (
              <Card key={course._id} className="flex flex-col">
                <CardHeader>
                  <Image
                    src={course.thumbnail && course.thumbnail.startsWith('http') ? course.thumbnail : "/course.png"}
                    alt={course.name}
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover"
                    unoptimized={typeof course.thumbnail === 'string' && course.thumbnail.startsWith('http')}
                  />
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription className="mb-4">{course.description}</CardDescription>
                  <div className="mt-auto space-y-2 text-sm">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-primary" />
                      <span>{"Intermediate"}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>Duration: {course.duration} hours</span>
                    </div>
                  </div>
                </CardContent>
                <Link href={`/myCourses/${course._id}`}>
                  <Button
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                  >
                    Go to course
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  )
}