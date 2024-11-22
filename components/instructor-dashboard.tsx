'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'


const runningCourses = [
  { id: 1, title: "Advanced React", students: 120, revenue: 5999.99, lastUpdated: "2024-03-15" },
  { id: 2, title: "TypeScript", students: 85, revenue: 4249.99, lastUpdated: "2024-03-10" },
  { id: 3, title: "Data Structures and Algorithms", students: 150, revenue: 7499.99, lastUpdated: "2024-03-18" },
]

export default function InstructorDashboard({ name }: { name: string }) {
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold heading text-purple-700">Welcome Back, {name}</h1>
        {/* shift to next line */}
        
        <Link href={`/admin/course/create`}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start New Course
          </Button>
        </Link>
      </div>
      <h2 className='text-xl font-bold mb-4 py-4'>Here is your analytics dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">355</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17,749.97</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 new course this month</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Current Courses</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {runningCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>Last updated: {course.lastUpdated}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span className="font-semibold">{course.students}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue:</span>
                  <span className="font-semibold">${course.revenue.toFixed(2)}</span>
                </div>
              </div>
              <Link href={`/admin/course/${course.title}`}>
                <Button className="w-full mt-4" variant="outline">Manage Course</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}