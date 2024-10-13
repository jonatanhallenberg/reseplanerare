import { Router } from "express";
import sampleRoutes from "./sampleRoutes";

const router = Router();

router.use("/sample", sampleRoutes);

export default router;
