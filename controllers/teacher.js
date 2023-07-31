import User from "../models/User.js";
import createError from "../error.js";
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';





// Create teacher
export const createTeacher = async (req, res, next) => {

    const newTeacher = new Teacher({ userId: req.params.id, ...req.body })
    try {
        const savedTeacher = await newTeacher.save()
        res.status(200).json(savedTeacher)

    } catch (err) {
        next(err)

    }
}







// Delete teacher
export const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the teacher document to be deleted
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            throw createError(404, 'Teacher not found');
        }

        // Delete the teacher document
        await Teacher.findByIdAndDelete(id);

        // Check if any other teacher document exists for the user


        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        next(err);
    }
};










//get teacher with userId 
export const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({ userId: req.params.id });

        res.status(200).json(teachers);
    } catch (err) {
        next(err);
    }
};

