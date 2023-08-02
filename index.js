import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import courseRoutes from './routes/courses.js'
import chapterRoutes from './routes/chapters.js'
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from "multer";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import teacherRoutes from './routes/Teacher.js';
import studentRoutes from './routes/Student.js';
import departmentRoutes from './routes/Department.js'
import levelRoutes from './routes/level.js'
import instituteRoutes from './routes/institute.js';
import specializationRoutes from './routes/specialization.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);



const app = express();

app.use(cors({
  origin:["https://front-end-jami3aty.vercel.app"],
  methods:["POST","GET"],
  credentials: true,
}));



dotenv.config();


const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('Connected to mongoDB');
    }).catch(err => {
        throw err;
    });
};




app.use('/image', express.static(path.join(__dirname, 'file')));
app.use(express.static('image'))
app.use('/files', express.static(path.join(__dirname, 'file')));
app.use(express.static('file'))
app.use(cookieParser())
app.use(express.json())
// this routes 
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/course", courseRoutes)
app.use("/api/chapter", chapterRoutes)
app.use("/api/teacher", teacherRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/department", departmentRoutes)
app.use("/api/institute", instituteRoutes)
app.use("/api/level", levelRoutes)
app.use("/api/specialization", specializationRoutes)



app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Somethin went wrong!";
    return res.status(status).json({
        success: false,
        Status: status,
        message: message
    })

})










app.listen(8800, () => {
    connect()
    console.log('connected to server 8800');
});













