import { auth } from "@/auth";
import { connectDB } from "@/lib/dbConnect";
import { CourseContent } from "@/models/courseContent.model";
import { Course } from "@/models/courses.model";
import { parseMultipartForm } from '@/utils/multer';
import { uploadToCloudinary } from "@/utils/cloudinary";

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { warnOptionHasBeenMovedOutOfExperimental } from "next/dist/server/config";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const { fields, files } = await parseMultipartForm(req);

    const courseId = fields.courseId;
    console.log(courseId);
    
    if (!courseId)
      return NextResponse.json({ sucess: false, message: "CourseId not found" }, { status: 404 });

    const course = await Course.findById( courseId )

    if (!course)
      return NextResponse.json({ sucess: false, message: "Course not found" }, { status: 404 })

    const modules = JSON.parse(fields.modulesData)

    const processedModules = await Promise.all(
      modules.map(async (module: any) => {

        const lect = await Promise.all(
          module.lectures.map(async (lecture: any) => {

            const resources = await Promise.all(
              lecture.resources.map(async (resource: any) => {

                if (resource.file) {
                  const fileKey = `file-${resource.id}`;
                  const fileBuffer = files[fileKey];

                  if (fileBuffer) {
                    try {
                      const url = await uploadToCloudinary(
                        fileBuffer,
                        `course-${courseId}/module-${module.id}/lecture-${lecture.id}`
                      );
                      return { ...resource, fileurl: url }
                    } catch (error) {
                      console.error("Error while uploading files", error)
                      return resource
                    }
                  }
                }
                return resource;
              })
            );

            return {
              ...lecture,
              resources: resources,
            };
          })
        );

        return {
          ...module,
          lectures: lect,
        };
      })
    );

    let courseContent = await CourseContent.findOne({ course: courseId });
    if (courseContent) {
      courseContent.modules = processedModules
      await courseContent.save()

    } else {
      courseContent = new CourseContent({
        course: courseId,
        modules: processedModules
      });
      await courseContent.save();

      course.courseContent = courseContent._id;
      await course.save()
    }
    return NextResponse.json({
      message: 'Course content saved successfully',
      courseContent: courseContent.toObject()
    });

  } catch (error) {
    console.error('Error in course content upload:', error);
    return NextResponse.json(
      {
        message: 'Failed to save course content',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}



export const GET = async (req: NextRequest, res: NextResponse) => {

  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
  try {

    await connectDB();


    const courseId = req.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json({ success: false, message: 'Course ID is required' }, { status: 400 });
    }


    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }


    const courseContent = await CourseContent.findOne({ course: courseId });
    if (!courseContent) {

      return NextResponse.json({ success: false, message: 'No content found for this course' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Course content retrieved successfully',
      courseContent: courseContent.toObject()
    }, { status: 200 });

  } catch (error) {
    console.error('Error retrieving course content:', error);
    return NextResponse.json({
      message: 'Failed to retrieve course content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

