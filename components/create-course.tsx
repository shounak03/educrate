'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import { toast } from 'sonner' // Assuming you're using sonner for notifications
import { useRouter } from 'next/navigation'

function CreateCourse({adminId}:{adminId:string}) {
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [courseDuration, setCourseDuration] = useState('')
  const [coursePrice, setCoursePrice] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      const reader = new FileReader()
      reader.onload = () => setThumbnailPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setCourseTitle('')
    setCourseDescription('')
    setCourseDuration('')
    setCoursePrice('')
    setThumbnail(null)
    setThumbnailPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)

      if (!thumbnail) {
        toast.error('Please select a thumbnail image')
        return
      }
      const formData = new FormData()
      formData.append('name', courseTitle)
      formData.append('description', courseDescription)
      formData.append('duration', courseDuration)
      formData.append('price', coursePrice)
      formData.append('thumbnail', thumbnail)

      const response = await fetch('/api/admin/createCourse', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log(data);
      
      if (data.success) {
        toast.success('Course created successfully!')
        resetForm()
      } else {
        toast.error(data.message || 'Error creating course')
      }
    } catch (error) {
      console.error('Error creating course:', error)
      toast.error('Something went wrong while creating the course')
    } finally {
      setLoading(false)
      // router.push(`/admin/course/${data.newCourse.id}`)
    }
  }

  return (
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label htmlFor="courseDuration">Course Duration</Label>
              <Input
                id="courseDuration"
                type="number"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                placeholder="Duration in hours"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="coursePrice">Course Price</Label>
              <Input
                id="coursePrice"
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="Enter price in USD"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <div className="relative bg-gray-200 rounded-lg flex items-center justify-center h-9 cursor-pointer hover:bg-gray-300">
                <span className="text-gray-700">
                  {loading ? 'Uploading...' : 'Choose File'}
                </span>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  required
                  disabled={loading}
                />
              </div>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button 
        type="submit" 
        className="w-full py-4"
        disabled={loading}
      >
        {loading ? 'Creating Course...' : 'Create Course'}
      </Button>
    </form>
  )
}

export default CreateCourse