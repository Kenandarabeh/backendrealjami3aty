import express from "express";
import { getUser, deleteUser, update, getByCategori, search, random,getAllUser, updateStudnet, updateTeacher, getUsersWithLevels } from '../controllers/user.js';
import verifyToken from "../verifyToken.js";
import multer from "multer";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const router = express.Router();
//update user
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, image, cb) {
        cb(null, path.join(__dirname, "../image"));
    },
    filename: function (req, image, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, image.fieldname + '-' + uniqueSuffix + path.extname(image.originalname));
    }
});

const upload = multer({ storage: storage });


// update user (upload the image )
router.put('/update/:id', upload.single('image') ,update)
router.put('/updateS/:id',upload.single('image'),updateStudnet)
router.put('/updateT/:id',upload.single('image'),updateTeacher)



//delete user
router.delete('/delete/:id', deleteUser)

//get a user
router.get('/find/:id', getUser)



//get all user just not admin
router.get('/findall',getAllUser)



// get with category .. not use
router.get("/category", getByCategori)


// get user with livel
router.get("/getUsersWithLevels",getUsersWithLevels)

export default router;







