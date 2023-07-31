import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true }
}, { timestamps: true });


export default mongoose.model("institute", teacherSchema);
