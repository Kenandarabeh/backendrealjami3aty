import Course from '../models/Course.js'
import createError from "../error.js";
import Chapter from '../models/Chapter.js';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cloudinary from '../cloudinary.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// add course 
export const addCourse = async (req, res, next) => {

    const newCource = new Course({ userId: req.params.id, ...req.body })
    try {
        const savedCourse = await newCource.save()
        res.status(200).json(savedCourse)




    } catch (err) {
        next(err)


    }


}












// delete course 
export const deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        // Find all chapters associated with the course
        const chapters = await Chapter.find({ CourseId: courseId });

        // Delete the associated files and remove the chapters
        for (const chapter of chapters) {
            if (chapter.file) {
                try {
                    const public_id = chapter.file.split('/').slice(-1)[0].split('.')[0];
                    await cloudinary.uploader.destroy(public_id);
                }
                catch (err) {
                    res.status(200).json({ message: err.message });
                    next();
                }
            }
            await chapter.deleteOne();
        }

        // Delete the course
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return next(createError(404, 'Course not found!'));
        }

        res.status(200).json('The Course and its associated chapters have been deleted.');
    } catch (err) {
        next(err);
    }
};







// update
export const updateCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);

        if (!course) {
            throw createError(404, "Course not found!");
        }

        // Updating the course's information based on the request body
        course.name = req.body.name;
        course.level = req.body.level;
        course.specialization = req.body.specialization;

        const updatedCourse = await course.save();

        res.status(200).json(updatedCourse);
    } catch (error) {
        next(error);
    }
};








//getcourse with userUd 
export const getCourse = async (req, res, next) => {

    try {
        const course = await Course.find({ userId: req.params.id })
        res.status(200).json(course)
    } catch (err) {
        next(err)




    }

}





//get course with the id course 
export const getCoursebyId = async (req, res, next) => {

    try {
        const course = await Course.find({ _id: req.params.id })
        res.status(200).json(course)
    } catch (err) {
        next(err)




    }

}




// get course with level (student)
export const getCourseByStudent = async (req, res, next) => {

    try {
        const course = await Course.find({ level: req.params.level })
        res.status(200).json(course)
    } catch (err) {
        next(err)




    }

}













