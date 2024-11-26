import mongoose, { Schema } from "mongoose";

const courseContentSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      unique: true
    },
    modules: [
      {
        moduleTitle: {
          type: String,
          required: true,
        },
        moduleDescription: {
          type: String,
        },
        lectures: [
          {
            title: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
            videoUrl: {
              type: String,
            },
            duration: {
              type: Number, // duration in minutes
            },
            resources: [
              {
                name: {
                  type: String,
                },
                fileUrl: {
                  type: String,
                },
                type: {
                  type: String,
                  enum: ['pdf', 'document', 'spreadsheet', 'presentation', 'other']
                }
              }
            ],
          }
        ]
      }
    ]
  },
  { 
    timestamps: true 
  }
);

export const CourseContent = mongoose.models.CourseContent || mongoose.model("CourseContent", courseContentSchema);