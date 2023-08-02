import User from '../models/User.js'
import bcrpt from "bcryptjs"
import createError from "../error.js";
import Jwt from "jsonwebtoken";
import teacher from '../models/Teacher.js';
import Student from '../models/Student.js';





// signup (ir create user )
export const signup = async (req, res, next) => {

    try {
        console.log(req.body)
        const self = bcrpt.genSaltSync(10);
        const hash = bcrpt.hashSync(req.body.password, self);
        const newUser = new User({
            ...req.body, image: req.file ? req.file.path : null,
            password: hash
        })
        if (req.body.role === "teacher") {
            const newTeacher = new teacher({
                userId: newUser._id,
                description: req.body.description,
            });
            await newTeacher.save();
        }

        else if (req.body.role === "student") {
            const newStudent = new Student({
                userId: newUser._id,
                level: req.body.level
            });
            await newStudent.save();

        }
        console.log(newUser)
        await newUser.save().then(() => {
            res.status(200).send("the cuser has ben created")

        })
    } catch (err) {
        next(err)
    }





};







// login 
export const signin = async (req, res, next) => {

    try {
        res.setHeader('Access-Control-Allow-Origin','https://front-end-jami3aty-fb28.vercel.app');
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "user not found!"))

        const isCorrect = await bcrpt.compare(req.body.password, user.password)
        if (!isCorrect) return next(createError(400, "wrong credentials !"))



        var token = Jwt.sign({ id: user._id }, process.env.Jwt)
        const { password, ...others } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(others);
        console.log(token)

    } catch (err) {
        next(err)
    }





};
