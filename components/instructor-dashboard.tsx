'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'

interface Analytics {
  totalStudents: { value: number; growth: number };
  totalRevenue: { value: number; growth: number };
  activeCourses: { value: number; growth: number };
}

interface Course {
  id: string;
  title: string;
  students: number;
  revenue: number;
  lastUpdated: string;
}

interface DashboardData {
  creatorName: string;
  analytics: Analytics;
  courses: Course[];
}

export default function InstructorDashboard({ creatorId }: { creatorId: string }) {
  const [data, setData] = useState<DashboardData>({
    creatorName: '',
    analytics: {
      totalStudents: { value: 0, growth: 0 },
      totalRevenue: { value: 0, growth: 0 },
      activeCourses: { value: 0, growth: 0 }
    },
    courses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/info?creatorId=${creatorId}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, [creatorId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth}%`;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold heading text-purple-700">
            Welcome Back, {data.creatorName}
          </h1>
          <p className="text-gray-600 mt-2">Here's how your courses are performing</p>
        </div>
        
        <Link href={`/admin/course/create`}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start New Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.totalStudents.value}</div>
            <p className={`text-xs ${data.analytics.totalStudents.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatGrowth(data.analytics.totalStudents.growth)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.analytics.totalRevenue.value)}</div>
            <p className={`text-xs ${data.analytics.totalRevenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatGrowth(data.analytics.totalRevenue.growth)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.activeCourses.value}</div>
            <p className={`text-xs ${data.analytics.activeCourses.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatGrowth(data.analytics.activeCourses.growth)} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Current Courses</h2>
      {data.courses.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500">You haven't created any courses yet.</p>
          <Link href="/admin/course/create">
            <Button className="mt-4">Create Your First Course</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold">{formatCurrency(course.revenue)}</span>
                  </div>
                </div>
                <Link href={`/admin/course/${course.id}`}>
                  <Button className="w-full mt-4" variant="outline">
                    Manage Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* {data.courses.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/admin/courses">
            <Button variant="outline">View All Courses</Button>
          </Link>
        </div>
      )} */}
    </div>

  )
}