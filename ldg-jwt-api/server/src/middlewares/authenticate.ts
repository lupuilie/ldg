import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { tokenService } from "../services/tokenService";

function authenticate(req: Request, res: Response, next: NextFunction) {
  const service = tokenService();
  const token = req.cookies.token;
  if (!token) next(new createHttpError.Unauthorized("you need to login"));
  next();
}

export default authenticate;
