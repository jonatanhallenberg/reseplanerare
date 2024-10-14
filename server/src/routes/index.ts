import { Router } from "express";
import locationRouter from "./locationRouter";
import pingRouter from "./pingRouter";
import journeyRouter from "./journeyRouter";

const router = Router();

router.use("/location", locationRouter);
router.use("/ping", pingRouter);
router.use("/journey", journeyRouter);

export default router;
