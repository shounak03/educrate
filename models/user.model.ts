import mongoose,{Schema}  from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['creator', 'learner']
    },
    purchasedCourses: [{
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        purchaseDate: {
            type: Date,
            default: Date.now
        },
        price: {
            type: Number,
            required: true
        }
    }],
},{timestamps:true})

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;