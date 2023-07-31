import User from "../models/User.js";
import createError from "../error.js";
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import institute from "../models/institute.js";
import Department from "../models/Department.js";
import specialization from "../models/specialization.js";






// newspecialization
export const newspecialization = async (req, res, next) => {
    const Departments = await Department.find({ _id: req.params.id });
if(!Departments){
    res.status(200).json("Department not found ")

}else{
    const newspecializations = new specialization({ idDepartment: req.params.id, ...req.body })
    try {

        const newecializationss = await newspecializations.save()
        res.status(200).json(newecializationss)
    } catch (err) {
        next(err)

    }



}


}







// get all specializaiton with the department 
export const getAllS = async (req, res, next) => {
    try {
        const specializations = await specialization.find({ idDepartment: req.params.id })
        res.status(200).send(specializations)
    } catch (err) {
        next(err)
    }
}













// get specialization with name 
export const getS = async (req, res, next) => {
    try {
        const specializatione = await specialization.find({name:req.params.id})
        res.status(200).send(specializatione)
    } catch (err) {
        next(err)
    }
}



