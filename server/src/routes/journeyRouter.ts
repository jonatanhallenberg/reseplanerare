import { Router } from "express";
import { findJourney } from "../controllers/journeyController";

const router = Router();

router.get("/find", findJourney);

export default router;
