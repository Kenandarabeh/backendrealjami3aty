import express from "express";
import { getAllInstitutes, getI, newInstitute } from "../controllers/institute.js";
const router = express.Router();



// new institute
router.post('/add',newInstitute)



//get all student
router.get("/allI",getAllInstitutes)


// get institus with the name 
router.get("/aI/:id",getI)


export default router;

