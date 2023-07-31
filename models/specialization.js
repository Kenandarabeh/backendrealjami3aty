import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: {type:String,require:true, unique: true },
    idDepartment:{ type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
}, { timestamps: true });


export default mongoose.model("specialization", teacherSchema);
