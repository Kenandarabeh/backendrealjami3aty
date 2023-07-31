import express from "express";

import { getAllS, getS, newspecialization } from "../controllers/specialization.js";
const router = express.Router();
// add new specializaition
router.post('/add/:id',newspecialization)



// get all specializaition in the departement 
router.get("/allS/:id",getAllS)


// get the specialization with name 
router.get("/aS/:id",getS)


export default router;

