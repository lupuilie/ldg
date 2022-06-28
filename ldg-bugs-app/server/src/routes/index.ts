import { Router } from "express";
import { notFound } from "../middlewares/notFound";
import bugsRoute from "./bugsRoute";

const router = Router();

router.use("/api/bugs", bugsRoute);

router.use("*", notFound);

export default router;
