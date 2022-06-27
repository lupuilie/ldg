import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

function notFound(req: Request, res: Response, next: NextFunction) {
  next(new createError.NotFound("resource not found"));
}

export default notFound;
