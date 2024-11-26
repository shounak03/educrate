import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['pdf', 'document', 'video', 'other'],
    default: 'other'
  },
  fileUrl: {
    type: String,
    required: true
  }
});

const lectureSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  resources: [resourceSchema]
});

const moduleSchema = new Schema({
  moduleTitle: {
    type: String,
    required: true
  },
  moduleDescription: {
    type: String
  },
  lectures: [lectureSchema]
});

const courseContentSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      unique: true
    },
    modules: [moduleSchema]
  },
  { 
    timestamps: true 
  }
);

export const CourseContent = 
  mongoose.models.CourseContent || 
  mongoose.model("CourseContent", courseContentSchema);