import express from "express";
import multer from "multer";
import { signup, signin } from '../controllers/auth.js';
const router = express.Router();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// how upload the image
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



//Create A user

router.post('/signup', upload.single('image'), signup)





//signier
router.post('/signin', signin)




export default router;

