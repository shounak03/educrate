'use client'

import { use, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, CheckCircle, PlayCircle, BookOpen } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const courseData = {
  title: "Advanced React Patterns and Best Practices",
  progress: 35,
  modules: [
    {
      id: "module1",
      title: "Introduction to Advanced React Patterns",
      lectures: [
        { id: "lecture1_1", title: "Course Overview", duration: "10:00", completed: true },
        { id: "lecture1_2", title: "Setting Up the Development Environment", duration: "15:00", completed: true },
      ],
    },
    {
      id: "module2",
      title: "Component Composition Patterns",
      lectures: [
        { id: "lecture2_1", title: "Compound Components", duration: "25:00", completed: false },
        { id: "lecture2_2", title: "Render Props Pattern", duration: "30:00", completed: false },
        { id: "lecture2_3", title: "Higher-Order Components (HOCs)", duration: "35:00", completed: false },
      ],
    },
    {
      id: "module3",
      title: "State Management Techniques",
      lectures: [
        { id: "lecture3_1", title: "Context API Deep Dive", duration: "40:00", completed: false },
        { id: "lecture3_2", title: "Redux vs. Context + Hooks", duration: "45:00", completed: false },
        { id: "lecture3_3", title: "Implementing a Custom State Management Solution", duration: "50:00", completed: false },
      ],
    },
    {
      id: "module4",
      title: "Performance Optimization",
      lectures: [
        { id: "lecture4_1", title: "React.memo and useMemo", duration: "30:00", completed: false },
        { id: "lecture4_2", title: "useCallback and Its Applications", duration: "35:00", completed: false },
        { id: "lecture4_3", title: "Code Splitting and Lazy Loading", duration: "40:00", completed: false },
      ],
    },
  ],
}

export const CourseContent = ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = use(params);
  const [selectedModule, setSelectedModule] = useState(courseData.modules[0])
  const [selectedLecture, setSelectedLecture] = useState(selectedModule.lectures[0])

  const handleModuleChange = (moduleId: string) => {
    const mod = courseData.modules.find(m => m.id === moduleId)
    if (mod) {
      setSelectedModule(mod)
      setSelectedLecture(mod.lectures[0])
    }
  }

  const handleLectureChange = (lectureId: string) => {
    const lecture = selectedModule.lectures.find(l => l.id === lectureId)
    if (lecture) {
      setSelectedLecture(lecture)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
      <Progress value={courseData.progress} className="mb-4" />
      <p className="text-sm text-muted-foreground mb-6">{courseData.progress}% complete</p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="aspect-video bg-black rounded-t-lg">
              {/* Video player would go here */}
              <div className="flex items-center justify-center h-full text-white">
                Video Player Placeholder
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{selectedLecture.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">Duration: {selectedLecture.duration}</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Course Content</h3>
            <Select onValueChange={handleModuleChange} value={selectedModule.id}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent>
                {courseData.modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>{module.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ScrollArea className="h-[400px] pr-4">
              {selectedModule.lectures.map((lecture) => (
                <Button
                  key={lecture.id}
                  variant="ghost"
                  className="w-full justify-start py-2 px-0 mb-2"
                  onClick={() => handleLectureChange(lecture.id)}
                >
                  {lecture.completed ? (
                    <CheckCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <PlayCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="truncate text-left">{lecture.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{lecture.duration}</span>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Additional Resources
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Lecture slides (PDF)</li>
            <li>Code examples (GitHub repository)</li>
            <li>Recommended reading materials</li>
            <li>Practice exercises</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}