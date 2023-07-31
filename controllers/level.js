import User from "../models/User.js";
import createError from "../error.js";
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import institute from "../models/institute.js";
import Department from "../models/Department.js";
import level from "../models/level.js";
import specialization from "../models/specialization.js";

//create level
export const newlevel = async (req, res, next) => {
    const specializations = await specialization.find({ _id: req.params.id });
if(!specializations){
    res.status(200).json("specialization not found ")

}else{
    const newlevels = new level({ idspecialization: req.params.id, ...req.body })
    try {

        const newlevelss = await newlevels.save()
        res.status(200).json(newlevelss)




    } catch (err) {
        next(err)




    }



}


}


















// get all level with the id specialization 
export const getAllLev = async (req, res, next) => {
    try {
        const levels = await level.find({ idspecialization: req.params.id })
        res.status(200).send(levels)
    } catch (err) {
        next(err)
    }
}


