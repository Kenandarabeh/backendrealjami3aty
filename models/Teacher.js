import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true  },
}, { timestamps: true });


export default mongoose.model("Teacher", teacherSchema);
