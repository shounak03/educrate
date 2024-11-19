'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X } from 'lucide-react'

interface ContentSection {
  id: string
  title: string
  lectures: { id: string; title: string }[]
}

export default function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [courseDuration, setCourseDuration] = useState('')
  const [coursePrice, setCoursePrice] = useState('')
  const [contentSections, setContentSections] = useState<ContentSection[]>([])

  const addContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      title: '',
      lectures: []
    }
    setContentSections([...contentSections, newSection])
  }

  const addLecture = (sectionId: string) => {
    setContentSections(contentSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: [...section.lectures, { id: Date.now().toString(), title: '' }]
        }
      }
      return section
    }))
  }

  const updateSectionTitle = (sectionId: string, title: string) => {
    setContentSections(contentSections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    ))
  }

  const updateLectureTitle = (sectionId: string, lectureId: string, title: string) => {
    setContentSections(contentSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: section.lectures.map(lecture => 
            lecture.id === lectureId ? { ...lecture, title } : lecture
          )
        }
      }
      return section
    }))
  }

  const removeSection = (sectionId: string) => {
    setContentSections(contentSections.filter(section => section.id !== sectionId))
  }

  const removeLecture = (sectionId: string, lectureId: string) => {
    setContentSections(contentSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
        }
      }
      return section
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the course data to your backend
    console.log({
      courseTitle,
      courseDescription,
      courseDuration,
      coursePrice,
      contentSections
    })
    // Reset form or redirect after successful submission
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>Provide the basic information about your course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseDescription">Course Description</Label>
              <Textarea
                id="courseDescription"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Enter course description"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseDuration">Course Duration</Label>
                <Input
                  id="courseDuration"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  placeholder="e.g., 6 weeks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coursePrice">Course Price</Label>
                <Input
                  id="coursePrice"
                  type="number"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  placeholder="Enter price in USD"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>Add sections and lectures to your course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contentSections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Input
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    placeholder="Enter section title"
                    className="font-semibold"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {section.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center space-x-2">
                      <Input
                        value={lecture.title}
                        onChange={(e) => updateLectureTitle(section.id, lecture.id, e.target.value)}
                        placeholder="Enter lecture title"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLecture(section.id, lecture.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addLecture(section.id)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Lecture
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addContentSection}
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Content Section
            </Button>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">Create Course</Button>
      </form>
    </div>
  )
}