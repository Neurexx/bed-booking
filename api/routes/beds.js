import express from "express";

import { createBed, getBedByType } from "../controllers/beds.js";

const router = express.Router();


router.get("/getByType", getBedByType)
router.get("/create", createBed)


export default router