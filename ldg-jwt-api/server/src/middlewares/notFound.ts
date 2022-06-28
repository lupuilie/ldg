import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

function notFound(req: Request, res: Response, next: NextFunction) {
  next(new createHttpError.NotFound("resource not found"));
}

export default notFound;
