

'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X } from 'lucide-react'
import { toast } from 'sonner'

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'document' | 'video' | 'other';
  file: File | null;
  fileUrl: string
}

interface Lecture {
  id: string;
  title: string;
  resources: Resource[];
}

interface ContentModule {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
}

function AddContent({ courseId }: { courseId: string }) {
  
  const [contentModules, setContentModules] = useState<ContentModule[]>([])
  const [existingContent, setExistingContent] = useState<any>(null)

  const fetchExistingContent = async () => {
    try {
      const response = await axios.get(`/api/admin/addCourseContent?courseId=${courseId}`);
      if (response.data.courseContent) {
        setExistingContent(response.data.courseContent);
        // Convert existing content to frontend format
        const formattedModules = response.data.courseContent.modules.map((module:any) => ({
          id: module._id || Date.now().toString(),
          title: module.moduleTitle,
          description: module.moduleDescription,
          lectures: module.lectures.map((lecture:any) => ({
            id: lecture._id || Date.now().toString(),
            title: lecture.title,
            resources: lecture.resources.map((resource:any) => ({
              id: resource._id || Date.now().toString(),
              name: resource.name,
              type: resource.type,
              file: null,
              fileUrl: resource.fileUrl
            }))
          }))
        }));
        setContentModules(formattedModules);
      }
    } catch (error) {
      console.log('Error fetching existing content:', error);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchExistingContent();
    }
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Ensure all required fields are populated
      const processedModules = contentModules.map(module => ({
        ...module,
        moduleTitle: module.title || 'Untitled Module', // Ensure moduleTitle exists
        moduleDescription: module.description || '',
        lectures: module.lectures.map(lecture => ({
          ...lecture,
          title: lecture.title || 'Untitled Lecture', // Ensure lecture title exists
          resources: lecture.resources.map(resource => ({
            ...resource,
            name: resource.name || 'Unnamed Resource',
            type: resource.type || 'other',
            fileUrl: resource.fileUrl || '', // Add this if not already present
          }))
        }))
      }));
  
      // Add modules data
      formData.append('courseId', courseId);
      formData.append('modulesData', JSON.stringify(processedModules));
  
      // Add file inputs
      processedModules.forEach((module) => {
        module.lectures.forEach((lecture) => {
          lecture.resources.forEach((resource) => {
            if (resource.file) {
              formData.append(`file-${resource.id}`, resource.file);
            }
          });
        });
      });
  
      const response = await axios.post('/api/admin/addCourseContent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Show success message
      toast.success('Course content saved successfully');
  
      // Optionally update UI with response data
      setExistingContent(response.data.courseContent);
    } catch (error) {
      console.error('Error saving course content:', error);
      toast.error('Failed to save course content');
    }
  }


  const addContentModule = () => {
    const newModule: ContentModule = {
      id: Date.now().toString(),
      title: '',
      description: '',
      lectures: []
    }
    setContentModules([...contentModules, newModule])
  }

  const addLecture = (moduleId: string) => {
    setContentModules(contentModules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lectures: [...module.lectures, { 
            id: Date.now().toString(), 
            title: '',
            resources: []
          }]
        }
      }
      return module
    }))
  }

  const addResource = (moduleId: string, lectureId: string) => {
    setContentModules(contentModules.map((module:any) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lectures: module.lectures.map((lecture:any) => {
            if (lecture.id === lectureId) {
              return {
                ...lecture,
                resources: [...lecture.resources, {
                  id: Date.now().toString(),
                  name: '',
                  type: 'other',
                  file: null
                }]
              }
            }
            return lecture
          })
        }
      }
      return module
    }))
  }

  const updateModuleTitle = (moduleId: string, title: string) => {
    setContentModules(contentModules.map(module =>
      module.id === moduleId ? { ...module, title } : module
    ))
  }

  const updateModuleDescription = (moduleId: string, description: string) => {
    setContentModules(contentModules.map(module =>
      module.id === moduleId ? { ...module, description } : module
    ))
  }

  const updateLectureTitle = (moduleId: string, lectureId: string, title: string) => {
    setContentModules(contentModules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lectures: module.lectures.map(lecture =>
            lecture.id === lectureId ? { ...lecture, title } : lecture
          )
        }
      }
      return module
    }))
  }

  const updateResourceDetails = (
    moduleId: string, 
    lectureId: string, 
    resourceId: string, 
    updates: Partial<Resource>
  ) => {
    setContentModules(contentModules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lectures: module.lectures.map(lecture => {
            if (lecture.id === lectureId) {
              return {
                ...lecture,
                resources: lecture.resources.map(resource => 
                  resource.id === resourceId 
                    ? { ...resource, ...updates } 
                    : resource
                )
              }
            }
            return lecture
          })
        }
      }
      return module
    }))
  }

  const removeModule = (moduleId: string) => {
    setContentModules(contentModules.filter(module => module.id !== moduleId))
  }

  const removeLecture = (moduleId: string, lectureId: string) => {
    setContentModules(contentModules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lectures: module.lectures.filter(lecture => lecture.id !== lectureId)
        }
      }
      return module
    }))
  }

  const removeResource = (moduleId: string, lectureId: string, resourceId: string) => {
    setContentModules(contentModules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lectures: module.lectures.map(lecture => {
            if (lecture.id === lectureId) {
              return {
                ...lecture,
                resources: lecture.resources.filter(resource => resource.id !== resourceId)
              }
            }
            return lecture
          })
        }
      }
      return module
    }))
  }


  return (
    <Card className='mt-8'>
      <CardHeader>
        <CardTitle>
          {existingContent ? 'Update Course Content' : 'Add Course Content'}
        </CardTitle>
        <CardDescription>
          {existingContent 
            ? 'Modify the existing course content' 
            : 'Add modules, lectures, and resources to your course'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {contentModules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Input
                  value={module.title}
                  onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                  placeholder="Enter module title"
                  className="font-semibold"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeModule(module.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Textarea
                value={module.description}
                onChange={(e) => updateModuleDescription(module.id, e.target.value)}
                placeholder="Enter module description"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {module.lectures.map((lecture) => (
                <Card key={lecture.id} className="border-l-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Input
                      value={lecture.title}
                      onChange={(e) => updateLectureTitle(module.id, lecture.id, e.target.value)}
                      placeholder="Enter lecture title"
                      className="font-medium"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLecture(module.id, lecture.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {lecture.resources.map((resource) => (
                      <div 
                        key={resource.id} 
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Input
                          value={resource.name}
                          onChange={(e) => updateResourceDetails(
                            module.id, 
                            lecture.id, 
                            resource.id, 
                            { name: e.target.value }
                          )}
                          placeholder="Resource name"
                        />
                        
                        <select
                          value={resource.type}
                          onChange={(e) => updateResourceDetails(
                            module.id, 
                            lecture.id, 
                            resource.id, 
                            { type: e.target.value as Resource['type'] }
                          )}
                          className="border rounded p-2"
                        >
                          <option value="pdf">PDF</option>
                          <option value="document">Document</option>
                          <option value="video">Video</option>
                          <option value="other">Other</option>
                        </select>
                        
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              updateResourceDetails(
                                module.id, 
                                lecture.id, 
                                resource.id, 
                                { file }
                              )
                            }
                          }}
                          className="hidden"
                          id={`file-${resource.id}`}
                        />
                        
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById(`file-${resource.id}`)?.click()}
                        >
                          {resource.file ? resource.file.name : 'Add File'}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResource(module.id, lecture.id, resource.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addResource(module.id, lecture.id)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addLecture(module.id)}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Lecture
              </Button>
            </CardContent>
          </Card>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addContentModule}
          className="w-full"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Module
        </Button>
        
        <Button
        type="button"
        variant="default"
        onClick={handleSubmit}
        className="w-full mt-4"
      >
        {existingContent ? 'Update Course Content' : 'Save Course Content'}
      </Button>
      </CardContent>
    </Card>
  )
}

export default AddContent