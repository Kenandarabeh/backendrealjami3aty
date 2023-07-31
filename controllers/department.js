import User from "../models/User.js";
import createError from "../error.js";
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import institute from "../models/institute.js";
import Department from "../models/Department.js";








// Create teacher
export const newDepartment = async (req, res, next) => {
    const institutes = await institute.find({ _id: req.params.id });
    if (!institute) {
        res.status(200).json("institute not found ")

    } else {
        const newDepartment = new Department({ idinstitute: req.params.id, ...req.body })
        try {

            const newDepar = await newDepartment.save()
            res.status(200).json(newDepar)

        } catch (err) {
            next(err)

        }

    }

}










//get departement with idinstitute 
export const getAllD = async (req, res, next) => {
    try {
        const Departments = await Department.find({ idinstitute: req.params.id })
        res.status(200).send(Departments)
    } catch (err) {
        next(err)
    }
}










// get departement with name departements 
export const getD= async (req, res, next) => {
    try {
        const Departments = await Department.find({name:req.params.id})
        res.status(200).send(Departments)
    } catch (err) {
        next(err)
    }
}