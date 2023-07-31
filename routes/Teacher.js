import express from "express";
import { createTeacher, deleteTeacher,getTeachers } from "../controllers/teacher.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

// Create teacher
router.post("/:id", createTeacher);

// Delete teacher
router.delete("/delete/:id", deleteTeacher);

//get teacher
router.get('/getTeachers/:id',getTeachers);


export default router;
