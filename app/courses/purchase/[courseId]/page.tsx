'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { BookOpen, CircleUser, Clock } from 'lucide-react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react'
import { use } from 'react';
import { toast } from 'sonner';

interface CourseData {
    course: Course
}

interface Course {
    name: string,
    description: string,
    level: string,
    duration: number,
    price: number,
    creator: {
        fullname: string
    },
    thumbnail: string,
    updatedAt: string
}

const CoursePage = ({ params }: { params: Promise<{ courseId: string }> }) => {

    const { courseId } = use(params);
    const [data, setData] = useState<CourseData | null>(null);

    useEffect(() => {
        const getCourseData = async (courseId: string) => {
            try {
                const response = await fetch(`/api/courses/courseById?courseId=${courseId}`);
                const res = await response.json();
                setData(res);
            } catch (error) {
                console.log(error);
            }
        }
        getCourseData(courseId);
    }, [courseId]); 

    const purchaseCourse = async () => {
        try {
            const response = await axios.post(`/api/courses/purchase?courseId=${courseId}`);
            console.log(response);
        } catch (error) {
            return toast.error("Error purchasing course");
        }
        finally{
            toast.success("Course purchased successfully");
            redirect(`/myCourses`);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center'>
                <Card className="flex flex-col">
                    <CardHeader>
                        <Image
                            src={data?.course?.thumbnail && data?.course?.thumbnail.startsWith('http') 
                                ? data.course.thumbnail 
                                : "/course.png"}
                            alt={data?.course?.name || "Course Thumbnail"}
                            width={400}
                            height={200}
                            className="rounded-t-lg object-cover"
                        />
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <CardTitle>{data?.course?.name}</CardTitle>
                        <div className="mt-auto space-y-2 text-sm">
                            <div className="flex mt-2 items-center">
                                <CircleUser className="w-4 h-4 mr-2 text-primary" />
                                <span>Instructor: {data?.course?.creator?.fullname}</span>
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-primary" />
                                <span>{"Intermediate"}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-primary" />
                                <span>Duration: {data?.course?.duration} hours</span>
                            </div>
                        </div>
                    </CardContent>
                    <Button onClick={purchaseCourse}>
                        Pay {data?.course?.price} INR
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default CoursePage;