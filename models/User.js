import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    image: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    }


}, { timestamps: true });
export default mongoose.model("User", UserSchema);


// "firstName":"kenadnarabeh",
// "lastName":"kenadnarabeh",
// "email":"test@gmail.com",
// "password":"kenadnarabeh",
// "role":"student"
// institute
// Department
// specialization














