
import { auth } from "@/auth";
import { connectDB } from "@/lib/dbConnect";
import { Course } from "@/models/courses.model";
import User from "@/models/user.model";



const calculateGrowthPercentage = (currentValue:any, previousValue:any) => {
    if (previousValue === 0) return 100;
    return (((currentValue - previousValue) / previousValue) * 100).toFixed(1);
};

const getCreatorAnalytics = async (creatorId:string) => {
    try {
        // Get creator details
        const creator = await User.findById(creatorId);
        if (!creator) {
            throw new Error('Creator not found');
        }

        // Get all courses by the creator
        const courses = await Course.find({ creator: creatorId })
            .populate('enrolledStudents', 'fullname')
            .sort({ createdAt: -1 });

        if (!courses) {
            throw new Error('No courses found for this creator');
        }

        // Calculate current month and previous month dates
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        // Get monthly analytics
        const monthlyAnalytics = await User.aggregate([
            { $unwind: '$purchasedCourses' },
            {
                $match: {
                    'purchasedCourses.course': {
                        $in: courses.map(course => course._id)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$purchasedCourses.purchaseDate' },
                        year: { $year: '$purchasedCourses.purchaseDate' }
                    },
                    revenue: { $sum: '$purchasedCourses.price' },
                    students: { $addToSet: '$_id' }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 2 }
        ]);

        // Process monthly data
        const currentMonthData = monthlyAnalytics.find(m => 
            m._id.month === now.getMonth() + 1 && m._id.year === now.getFullYear()
        ) || { revenue: 0, students: [] };
        const previousMonthData = monthlyAnalytics.find(m => 
            m._id.month === previousMonthStart.getMonth() + 1 && m._id.year === previousMonthStart.getFullYear()
        ) || { revenue: 0, students: [] };

        // Get course details with formatted data
        const activeCourses = courses.map(course => ({
            id: course._id,
            title: course.name,
            students: course.enrolledStudents.length,
            revenue: course.enrolledStudents.length * course.price,
            lastUpdated: course.updatedAt.toISOString().split('T')[0],
        }));

        // Calculate total revenue
        const totalRevenue = activeCourses.reduce((sum, course) => sum + course.revenue, 0);
        const totalStudents = new Set(courses.flatMap(course => 
            course.enrolledStudents.map(student => student._id.toString())
        )).size;

        return {
            success: true,
            data: {
                creatorName: creator.fullname,
                analytics: {
                    totalStudents: {
                        value: totalStudents,
                        growth: calculateGrowthPercentage(
                            currentMonthData.students.length,
                            previousMonthData.students.length
                        )
                    },
                    totalRevenue: {
                        value: totalRevenue,
                        growth: calculateGrowthPercentage(
                            currentMonthData.revenue,
                            previousMonthData.revenue
                        )
                    },
                    activeCourses: {
                        value: courses.length,
                        growth: 0 // You might want to implement specific logic for course growth
                    }
                },
                courses: activeCourses
            }
        };

    } catch (error:any) {
        return {
            success: false,
            error: error.message
        };
    }
};

// API route handler
export async function GET(req: Request) {
    try {
        connectDB()
        const session = await auth()
        const creatorId = session?.user?.id;

        if (!creatorId) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Creator ID is required'
            }), { status: 400 });
        }

        const analytics = await getCreatorAnalytics(creatorId);
        
        return new Response(JSON.stringify(analytics), {
            status: analytics.success ? 200 : 400
        });

    } catch (error:any) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), { status: 500 });
    }
}