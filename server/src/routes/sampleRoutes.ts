import { Router } from "express";
import { getSampleData } from "../controllers/sampleController";

const router = Router();

router.get("/", getSampleData);

export default router;
