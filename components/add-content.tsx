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

function AddContent() {

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
  return (
    <Card className='mt-8'>
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
  )
}

export default AddContent