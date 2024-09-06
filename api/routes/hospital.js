import express from "express";
import { createHospital,getHospitals, getHospitalById, updateHospital } from "../controllers/hospital.js";

const router = express.Router();

router.post("/create", createHospital)
router.post("/get", getHospitals)
router.post("/get", getHospitalById)

export default router