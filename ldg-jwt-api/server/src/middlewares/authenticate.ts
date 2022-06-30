import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { tokenService } from "../services/tokenService";

function authenticate(allowed: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const service = tokenService();
      const token = service.tokenFromRequest(req);
      if (!token) throw new createHttpError.Unauthorized("you need to login");

      await service.verifyToken(token);
      const audience = service.getAudience(token);
      const accessNotPermitted = !audience.includes(allowed);
      if (accessNotPermitted)
        throw new createHttpError.Forbidden("you cannot access this resource");

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default authenticate;
