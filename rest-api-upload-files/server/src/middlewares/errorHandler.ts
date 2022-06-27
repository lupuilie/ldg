import { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import multer from "multer";

function jsonError(code = 500, name: string, message: string) {
  return {
    error: { code, name, message },
  };
}

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpError) {
    return res
      .status(error.status)
      .json(jsonError(error.status, error.name, error.message));
  }

  if (error instanceof multer.MulterError) {
    const getCode = () => {
      if (error.code === "LIMIT_FILE_SIZE") return 413;
      return 400;
    };
    const status = getCode();

    return res
      .status(status)
      .json(jsonError(status, error.name, error.message));
  }

  if (error instanceof Error) {
    return res.status(500).json(jsonError(500, error.name, error.message));
  }

  // Let Express handle the error
  next(error);
}

export default errorHandler;
