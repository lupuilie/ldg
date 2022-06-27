import { Router, Request, Response, NextFunction } from "express";
import path from "path";

import FilesController from "../controllers/FilesController";
import uploadFile from "../middlewares/uploadFile";

const filesRoute = Router();
const controller = FilesController();

filesRoute.post("/", uploadFile("uploaded_file"), controller.singleFile);

filesRoute.get("/", (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const filePath = path.join(
    __dirname,
    "../../uploads/fb36c7d4c94d49bf25d0f740ac35fce7.jpg"
  );

  res.sendFile(filePath);
});

export default filesRoute;
