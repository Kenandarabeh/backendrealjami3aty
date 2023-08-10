import User from '../models/User.js'
import bcrpt from "bcryptjs"
import createError from "../error.js";
import Jwt from "jsonwebtoken";
import teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import cloudinary from '../cloudinary.js';


// signup (or create user)
export const signup = async (req, res, next) => {
  try {
    
    const self = bcrpt.genSaltSync(10);
    const hash = bcrpt.hashSync(req.body.password, self);
    let imageUrl = ''; // Initialize imageUrl variable

    // Check if image file was uploaded
    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Store the image URL from Cloudinary
    }

    const newUser = new User({
      ...req.body,
      image: imageUrl, // Set the image URL in the user model
      password: hash
    });

    if (req.body.role === "teacher") {
      const newTeacher = new teacher({
        userId: newUser._id,
        description: req.body.description,
      });
      await newTeacher.save();
    } else if (req.body.role === "student") {
      const newStudent = new Student({
        userId: newUser._id,
        level: req.body.level
      });
      await newStudent.save();
    }

    console.log(newUser);
    await newUser.save().then(() => {
      res.status(200).send("the user has been created");
    });
  } catch (err) {
    next(err);
  }
};





// login 
export const signin = async (req, res, next) => {

  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, "user not found!"))

    const isCorrect = await bcrpt.compare(req.body.password, user.password)
    if (!isCorrect) return next(createError(400, "wrong credentials !"))



    var token = Jwt.sign({ id: user._id }, process.env.JWT)
    const { password, ...others } = user._doc;

    res.cookie('access_token', token, {
      httpOnly: true
    }).status(200).json(others);
    console.log(token)

  } catch (err) {
    next(err)
  }





};