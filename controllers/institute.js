import User from '../models/User.js'
import institute from '../models/institute.js';








// new institute 
export const newInstitute = async (req, res, next) => {

    try {
        console.log(req.body)

        const newIns = new institute({
            ...req.body
        })

        console.log(newIns)
        await newIns.save().then(() => {
            res.status(200).send("the institu has ben created")

        })
    } catch (err) {
        next(err)
    }





};






//get all institutes
export const getAllInstitutes = async (req, res, next) => {
    try {
        const institutes = await institute.find()
        res.status(200).send(institutes)
    } catch (err) {
        next(err)
    }
}





// get institute with name
export const getI= async (req, res, next) => {
    try {
        const institutes = await institute.find({name:req.params.id})
        res.status(200).send(institutes)
    } catch (err) {
        next(err)
    }
}