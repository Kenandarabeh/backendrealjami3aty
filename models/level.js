import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: {type:String,require:true, unique: true },
    idspecialization:{ type: mongoose.Schema.Types.ObjectId, ref: 'specialization', required: true },
}, { timestamps: true });


export default mongoose.model("level", teacherSchema);
