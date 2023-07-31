import express from 'express';
import multer from 'multer';
import { addChapter, updateChapter, deleteChapter, getChapters } from '../controllers/chapter.js';
import verifyToken from '../verifyToken.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../file"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/:CourseId', upload.single('file'), addChapter);
router.get('/getchapter/:CourseId', getChapters);
router.delete('/delete/:ChapterId', deleteChapter);
router.put('/:ChapterId/:CourseId', verifyToken, updateChapter);

export default router;
