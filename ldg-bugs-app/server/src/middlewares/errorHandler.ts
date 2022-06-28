import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    const message = err.message;
    const statusCode = err.statusCode;
    const error = { message, statusCode };

    return res.status(statusCode).json({ error });
  }
  if (err instanceof Error) {
    const message = err.message;
    const statusCode = 400;
    const error = { message, statusCode };
    return res.status(statusCode).json({ error });
  }

  // goes to default Express Error Handler
  next();
}
