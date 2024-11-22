'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, CircleUser, Clock, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const courseCategories = [
  {
    name: "Web Development",
    courses: [
      { id: 1, title: "Full-Stack Web Development", description: "Learn to build complete web applications", level: "Intermediate", duration: "12 weeks", price: 199.99 },
      { id: 2, title: "React Masterclass", description: "Become an expert in React and its ecosystem", level: "Advanced", duration: "8 weeks", price: 149.99 },
      { id: 3, title: "CSS Animations and Transitions", description: "Create stunning web animations with CSS", level: "Beginner", duration: "4 weeks", price: 79.99 },
    ]
  },
  {
    name: "Machine Learning",
    courses: [
      { id: 4, title: "Introduction to Machine Learning", description: "Learn the basics of ML algorithms", level: "Beginner", duration: "6 weeks", price: 129.99 },
      { id: 5, title: "Deep Learning with TensorFlow", description: "Master deep learning using TensorFlow", level: "Intermediate", duration: "10 weeks", price: 179.99 },
      { id: 6, title: "Natural Language Processing", description: "Explore NLP techniques and applications", level: "Advanced", duration: "8 weeks", price: 159.99 },
    ]
  },
  {
    name: "Data Science",
    courses: [
      { id: 7, title: "Data Analysis with Python", description: "Learn to analyze data using Python", level: "Beginner", duration: "6 weeks", price: 99.99 },
      { id: 8, title: "Big Data Processing with Spark", description: "Master big data processing techniques", level: "Intermediate", duration: "8 weeks", price: 149.99 },
      { id: 9, title: "Data Visualization with D3.js", description: "Create interactive data visualizations", level: "Intermediate", duration: "6 weeks", price: 119.99 },
    ]
  },
]

export default function ExploreCourses() {


  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [data, setData] = useState('')


  const fetchCourses = async () => {
    const response = await fetch('/api/courses');
    const data = await response.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    fetchCourses().then(data => setData(data));
  }, []);

  const filteredCategories = data?.courses?.map(category => ({
    ...category,
    courses: data.courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLevel === '' || course.level === selectedLevel)
    )
  })).filter(category => data.courses.length > 0)

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


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.courses?.map((course) => (
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
                  <span>{course?.creator?.fullname}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  <span>Intermediate</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span>Duration: {course.duration} hours</span>
                </div>

              </div>
            </CardContent>
            <Link href={`/courses/${course.name}`}>
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

      {/* {filteredCategories.map((category) => (
        <section key={category.name} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <Image
                    src={`/placeholder.svg?text=${encodeURIComponent(course.title)}`}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="mb-4">{course.description}</CardDescription>
                  <div className="mt-auto space-y-2 text-sm">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-primary" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    
                  </div>
                </CardContent>
                <Link href={`/courses/${course.title}`}>
                <Button
                      className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                        INR 499.00
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                        Enroll Now
                      </span>
                    </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      ))} */}
      {/* {filteredCategories.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No courses found matching your criteria.</p>
      )} */}
    </main>
  )
}