import { Router } from "express";
import locationRouter from "./locationRouter";
import pingRouter from "./pingRouter";

const router = Router();

router.use("/location", locationRouter);
router.use("/ping", pingRouter);

export default router;
