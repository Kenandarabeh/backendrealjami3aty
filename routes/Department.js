import express from "express";
import { newInstitute } from "../controllers/institute.js";
import { getAllD, getD, newDepartment } from "../controllers/department.js";
const router = express.Router();



// add new department 
router.post('/add/:id', newDepartment)


// add all departement from the institus id 
router.get("/allD/:id", getAllD)


//get departement with name 
router.get("/aD/:id", getD)



export default router;

