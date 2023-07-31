import express from "express";
import { newInstitute } from "../controllers/institute.js";
import { newDepartment } from "../controllers/Department.js";
import { getAllLev, newlevel } from "../controllers/level.js";
const router = express.Router();


// add new level 
router.post('/add/:id',newlevel)


// get level with the name 
router.get("/alllev/:id",getAllLev)


export default router;

