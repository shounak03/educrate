'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, CircleUser, Clock, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface courseData{
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

export default function ExploreCourses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [courses, setCourses] = useState<courseData[]>([])
  const [filteredCourses, setFilteredCourses] = useState<courseData[]>([])


  const fetchCourses = async () => {
    const response = await fetch('/api/courses');
    const data = await response.json();
    setCourses(data.courses);
    setFilteredCourses(data.courses);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // Filter courses based on search term and level
    let result = courses;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.creator.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      result = result.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedLevel, courses]);

  return (
    <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Our Courses</h1>

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
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No courses found matching your search criteria.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course?._id} className="flex flex-col">
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
                    <CircleUser className="w-4 h-4 mr-2 text-primary" />
                    <span>Instructor: {course?.creator?.fullname}</span>
                  </div>
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
              <Link href={`/courses/${course._id}`}>
                <Button
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                    {course.price} INR
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                    Enroll Now
                  </span>
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}