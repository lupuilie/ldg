import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

function FilesController() {
  async function singleFile(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(req.file);
    } catch (err) {
      next(err);
    }
  }

  return {
    singleFile,
  };
}

export default FilesController;
