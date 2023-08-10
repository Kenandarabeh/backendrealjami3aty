import bcrpt from "bcryptjs"
import createError from "../error.js";
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import Course from '../models/Course.js';
import Chapter from '../models/Chapter.js';
import cloudinary from '../cloudinary.js';

//--------------        --------------------------------------------------------------------------------------------------------------------------
// get users with levels 
export const getUsersWithLevels = async (req, res) => {
    try {
        // Fetch all users with the role of "student"
        const users = await User.find({ role: "student" });

        // Fetch the associated level from the Student model for each user
        const formattedUsers = await Promise.all(
            users.map(async (user) => {
                const student = await Student.findOne({ userId: user._id });
                return {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    institute: user.institute,
                    Department: user.Department,
                    _id: user._id,
                    specialization: user.specialization,
                    image: user.image,
                    role: user.role,
                    level: student ? student.level : null,
                };
            })
        );

        // Send the formatted users' data as a response
        return res.status(200).json(formattedUsers);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




















//--------------        --------------------------------------------------------------------------------------------------------------------------





export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            throw createError(404, 'User not found');
        }

        // Delete the user's image from Cloudinary
        if (user.image) {
            try {
                const public_id = user.image.split('/').slice(-1)[0].split('.')[0];
                await cloudinary.uploader.destroy(public_id);
            }
            catch (err) {
                res.status(200).json({ message: err.message });
                next();
            }
        }

        if (user.role === 'teacher') {
            const teacher = await Teacher.findOne({ userId: user._id });

            if (teacher) {
                const courses = await Course.find({ userId: user._id });

                for (const course of courses) {
                    const chapters = await Chapter.find({ CourseId: course._id });

                    for (const chapter of chapters) {
                        // Delete the files associated with the chapter
                        try {
                            const public_id = chapter.file.split('/').slice(-1)[0].split('.')[0];
                            await cloudinary.uploader.destroy(public_id);
                        }
                        catch (err) {
                            res.status(200).json({ message: err.message });
                            next();
                        }
                    }

                    await Chapter.deleteMany({ CourseId: course._id });
                }

                await Course.deleteMany({ userId: user._id });
            }

            await Teacher.findOneAndDelete({ userId: user._id });
        }

        if (user.role === 'student') {
            await Student.findOneAndDelete({ userId: user._id });
        }

        await User.findOneAndDelete(user._id);

        res.status(200).json({ message: 'User and associated data deleted successfully' });
    } catch (err) {
        next(err);
    }
};









//--------------        --------------------------------------------------------------------------------------------------------------------------



export const update = async (req, res, next) => {
    try {
        // Finding the user to be updated by their ID
        const findUser = await User.findById(req.params.id);
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete existing image from Cloudinary if a new image is being uploaded
        if (findUser.image) {
            const public_id = findUser.image.split('/').slice(-1)[0].split('.')[0];
            await cloudinary.uploader.destroy(public_id);
        }

        // Updating the user's information based on the request body
        const salt = bcrpt.genSaltSync(10);
        const hash = bcrpt.hashSync(req.body.password, salt);

        findUser.firstName = req.body.firstName;
        findUser.lastName = req.body.lastName;
        findUser.email = req.body.email;
        findUser.password = hash;
        findUser.role = req.body.role;
        findUser.institute = req.body.institute;
        findUser.specialization = req.body.specialization;
        findUser.Department = req.body.Department;

        if (req.file) {
            // Upload the new image to Cloudinary
            const cloudinaryUploadResult = await cloudinary.uploader.upload(req.file.path);
            findUser.image = cloudinaryUploadResult.secure_url;
        }

        if (findUser.role === 'teacher') {
            // Delete the teacher document if role changes
            await Teacher.findOneAndDelete({ userId: findUser._id });

            // Create a new Teacher document
            const newTeacher = new Teacher({
                userId: findUser._id,
                description: req.body.description
            });
            await newTeacher.save();
        } else if (findUser.role === 'student') {
            // Delete the student document if role changes
            await Student.findOneAndDelete({ userId: findUser._id });

            // Create a new Student document
            const newStudent = new Student({
                userId: findUser._id,
                level: req.body.level
            });
            await newStudent.save();
        }

        // Saving the updated user
        const updatedUser = await findUser.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        // Handling errors and passing them to the error handling middleware
        next(err);
    }
};










//--------------        --------------------------------------------------------------------------------------------------------------------------

//update teacher 
export const updateTeacher = async (req, res, next) => {
    try {
        // Finding the user to be updated by their ID
        const findUser = await User.findById(req.params.id);
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const teacher2 = await Teacher.findOneAndDelete({ userId: findUser._id });




        // Deleting the user's existing image file, if it exists
        if (findUser.image) {
            const filePath = path.resolve(findUser.image);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                }
            });
        }

        // Updating the user's information based on the request body
        const self = bcrpt.genSaltSync(10);
        const hash = bcrpt.hashSync(req.body.password, self);




        findUser.firstName = req.body.firstName;
        findUser.lastName = req.body.lastName;
        findUser.email = req.body.email;
        findUser.password = hash;
        findUser.role = req.body.role;
        findUser.image = req.file.path;
        findUser.institute = req.body.institute
        findUser.specialization = req.body.specialization
        findUser.Department = req.body.Department
        console.log(findUser)

        const newTeacher = new Teacher({
            userId: findUser._id,
            description: req.body.description,
        });
        await newTeacher.save();








        // Saving the updated user
        const updatedUser = await findUser.save();
        // Fetching the updated user after the update operation
        console.log(updatedUser)
        res.status(200).json(updatedUser);
    } catch (err) {
        // Handling errors and passing them to the error handling middleware
        next(err);
    }
}











//--------------        --------------------------------------------------------------------------------------------------------------------------










//update student 
export const updateStudnet = async (req, res, next) => {
    try {
        // Finding the user to be updated by their ID
        const findUser = await User.findById(req.params.id);
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }



        const student = await Student.findOneAndDelete({ userId: findUser._id });




        // Deleting the user's existing image file, if it exists
        if (findUser.image) {
            const filePath = path.resolve(findUser.image);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                }
            });
        }

        // Updating the user's information based on the request body
        const self = bcrpt.genSaltSync(10);
        const hash = bcrpt.hashSync(req.body.password, self);




        findUser.firstName = req.body.firstName;
        findUser.lastName = req.body.lastName;
        findUser.email = req.body.email;
        findUser.password = hash;
        findUser.role = req.body.role;
        findUser.image = req.file.path;
        findUser.institute = req.body.institute
        findUser.specialization = req.body.specialization
        findUser.Department = req.body.Department
        console.log(findUser)

        const newStudent = new Student({
            userId: findUser._id,
            level: req.body.level
        });
        await newStudent.save();

        // Saving the updated user
        const updatedUser = await findUser.save();
        // Fetching the updated user after the update operation
        console.log(updatedUser)
        res.status(200).json(updatedUser);
    } catch (err) {
        // Handling errors and passing them to the error handling middleware
        next(err);
    }
}




//--------------        --------------------------------------------------------------------------------------------------------------------------


// get user with id 
export const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id)
        res.status(200).json(user)
        // res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
    } catch (err) {
        next(err)



    }

}




//--------------        --------------------------------------------------------------------------------------------------------------------------


//search categori
export const getByCategori = async (req, res, next) => {
    const catg = req.query.catg
    try {
        const users = await Course.find({ Branded: catg })
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }


}





//--------------        --------------------------------------------------------------------------------------------------------------------------------


// serche -- not use
export const search = async (req, res, next) => {

    const name = req.query.name
    try {
        const users = await User.find({ firstName: { $regex: name, $options: 'i' } })
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }



}






//-----------------------------------------------------------------------------------------------------------------------------------------------------




// get user random .. not use
export const random = async (req, res, next) => {
    try {
        const users = await User.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};













//--------------        --------------------------------------------------------------------------------------------------------------------------







// get all user just the admin
export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};












