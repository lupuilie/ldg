import { Request, Response, NextFunction } from "express";

import { collections } from "../services/dbService";
import { getAuthCredentials } from "../utils/requestUtils";
import usersService from "../services/usersService";

function usersController() {
  const service = usersService(collections);

  async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.getAll();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  async function login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials = getAuthCredentials(req);
      const login = await service.login(credentials);
      res.json({ ok: true, login });
    } catch (error) {
      next(error);
    }
  }

  return { login, getAll };
}

export default usersController;
