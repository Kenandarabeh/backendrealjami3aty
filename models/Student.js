import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    level:{ type:String,required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });


export default mongoose.model("Student", studentSchema);
