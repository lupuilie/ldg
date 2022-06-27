import { Router, Request, Response, NextFunction } from "express";
import filesRoute from "./filesRoute";

const router = Router();

router.use("/files", filesRoute);

export default router;
