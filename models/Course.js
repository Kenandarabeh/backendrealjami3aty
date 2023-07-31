import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    level: { type: String, required: true },
    specialization: {
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.model("Courses", courseSchema);
