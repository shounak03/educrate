import mongoose,{ Schema } from "mongoose";

const courseContentSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    Lectures: [{
        type: String,
        required: true
    }],
    docx:[{
        type: String,
    }],
});

export const CourseContent = mongoose.model('CourseContent', courseContentSchema);
