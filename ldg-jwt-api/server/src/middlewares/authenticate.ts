import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { tokenService } from "../services/tokenService";

function authenticate(allowed: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const service = tokenService();
      const token = req.cookies.token;

      if (!token) throw new createHttpError.Unauthorized("you need to login");
      const audience = service.getAudience(token);
      console.log(audience);
      if (!audience?.includes(allowed))
        throw new createHttpError.Unauthorized(
          "you cannot access this resource"
        );
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default authenticate;
