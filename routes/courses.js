import express from "express";
import { addCourse, deleteCourse, updateCourse, getCourse, getCourseByStudent, getCoursebyId } from '../controllers/course.js';
import verifyToken from "../verifyToken.js";
const router = express.Router();
//newcourse
router.post('/add/:id', addCourse)


//update user
router.delete('/delete/:id', deleteCourse)


//delete user
router.put('/update/:id', updateCourse)

//get a user
router.get('/find/:id', getCourse)
router.get('/findById/:id', getCoursebyId)

// get a course with the student
router.get('/findCourseBystudent/:level',getCourseByStudent)




export default router;

