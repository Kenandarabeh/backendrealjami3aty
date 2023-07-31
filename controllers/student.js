import User from "../models/User.js";
import createError from "../error.js";
import Course from '../models/Course.js';
import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js';



// get student with userId
export const getStudent = async (req, res, next) => {
    try {
        const Students = await Student.find({ userId: req.params.id });

        res.status(200).json(Students);
    } catch (err) {
        next(err);
    }
};