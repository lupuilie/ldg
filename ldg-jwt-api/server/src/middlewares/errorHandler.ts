import { Request, Response, NextFunction } from "express";
import { buildErrorObject } from "../utils/errorHandling";

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = error?.status || 500;
  res.status(statusCode).json(buildErrorObject(error));
}

export default errorHandler;
