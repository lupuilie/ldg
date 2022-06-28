import { Request, Response, NextFunction } from "express";

import { collections } from "../services/dbService";
import { getAuthCredentials } from "../utils/requestUtils";
import usersService from "../services/usersService";

function usersController() {
  const service = usersService(collections);

  async function login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials = getAuthCredentials(req);
      const login = await service.login(credentials);
      res.json({ ok: true, login });
    } catch (error) {
      next(error);
    }
  }

  return { login };
}

export default usersController;
