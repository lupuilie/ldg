import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new createError.NotFound("Resource cannot be found"));
}
