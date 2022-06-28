import { Router, Request, Response, NextFunction } from "express";

import usersRoute from "./usersRoute";

const router = Router();

router.get("/", indexRoute);
router.use("/users", usersRoute);

function indexRoute(req: Request, res: Response, next: NextFunction) {
  res.send("/api");
}

export default router;
