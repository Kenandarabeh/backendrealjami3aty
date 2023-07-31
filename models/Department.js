import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    idinstitute: { type: mongoose.Schema.Types.ObjectId, ref: 'institute', required: true },
}, { timestamps: true });


export default mongoose.model("Departement", teacherSchema);
