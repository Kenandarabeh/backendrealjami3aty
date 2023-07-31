import express from "express";
import {getStudent} from "../controllers/student.js"
import verifyToken from "../verifyToken.js";

const router = express.Router();



//get teacher
router.get('/getStudent/:id', getStudent);


export default router;
