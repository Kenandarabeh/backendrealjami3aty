import Chapter from '../models/Chapter.js';
import Course from '../models/Course.js';
import createError from 'http-errors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import cloudinary from '../cloudinary.js';





const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




// add chapter 
export const addChapter = async (req, res, next) => {
    try {
        console.log(cloudinary.config());
        const newChapter = new Chapter({
            name: req.body.name,
            src: req.body.src,
            CourseId: req.params.CourseId,
            file: null, // We'll update this after handling the file upload
        });

        // Upload the file to Cloudinary if it exists
        if (req.file) {
            const cloudinaryUploadResult = await cloudinary.uploader.upload(req.file.path);
            newChapter.file = cloudinaryUploadResult.secure_url;
        }

        const course = await Course.findById(req.params.CourseId);
        if (!course) {
            throw createError(401, 'Course not found!');
        }

        const savedChapter = await newChapter.save();
        res.status(201).json(savedChapter);
    } catch (err) {
        res.status(201).json(cloudinary.config());
        next(err);
    }
};














// update chapter 
export const updateChapter = async (req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.ChapterId);
        const course = await Course.findById(req.params.CourseId);

        if (!chapter || !course) {
            throw createError(404, 'Chapter or Course not found!');
        }

        if (req.user.id === course.userId && chapter.CourseId.equals(course._id)) {
            chapter.name = req.body.name;
            chapter.src = req.body.src;
            if (req.file) {
                chapter.file = req.file.path;
            }
            const updatedChapter = await chapter.save();
            res.status(200).json(updatedChapter);
        } else {
            throw createError(401, 'You can only update your own chapter!');
        }
    } catch (err) {
        next(err);
    }
};




// delete chapter 
export const deleteChapter = async (req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.ChapterId);

        if (!chapter) {
            throw createError(404, 'Chapter not found!');
        }

        // Delete the file if it exists
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
        await Chapter.deleteOne({ _id: req.params.ChapterId });
        res.status(200).json('The chapter has been deleted.');
    } catch (err) {
        next(err);
    }
};


















// get chapter
export const getChapters = async (req, res, next) => {
    try {
        const chapters = await Chapter.find({ CourseId: req.params.CourseId });
        res.status(200).json(chapters);
    } catch (err) {
        next(err);
    }
};
