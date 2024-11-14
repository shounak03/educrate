'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, BookOpen, Users } from 'lucide-react'

// Mock data for running courses
const runningCourses = [
  { id: 1, title: "Advanced React Patterns", students: 120, revenue: 5999.99, lastUpdated: "2024-03-15" },
  { id: 2, title: "Machine Learning Fundamentals", students: 85, revenue: 4249.99, lastUpdated: "2024-03-10" },
  { id: 3, title: "Data Structures and Algorithms", students: 150, revenue: 7499.99, lastUpdated: "2024-03-18" },
]

export default function InstructorDashboard({name}:{name:string}) {
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false)

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold heading uppercase text-purple-700">{name}'s Dashoboard</h1>
        <Dialog open={isNewCourseDialogOpen} onOpenChange={setIsNewCourseDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start New Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Course</DialogTitle>
              <DialogDescription>
                Fill in the details to start creating your new course.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="course-title">Course Title</Label>
                <Input id="course-title" placeholder="Enter course title" />
              </div>
              <div>
                <Label htmlFor="course-description">Course Description</Label>
                <Input id="course-description" placeholder="Enter course description" />
              </div>
              <div>
                <Label htmlFor="course-category">Category</Label>
                <Select>
                  <SelectTrigger id="course-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="machine-learning">Machine Learning</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Course</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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
              <Button className="w-full mt-4" variant="outline">Manage Course</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}