import { Request, Response, NextFunction } from "express";

import { collections } from "../services/dbService";
import { getAuthCredentials } from "../utils/requestUtils";
import usersService from "../services/usersService";
import { tokenService } from "../services/tokenService";
import booksService from "../services/booksService";

function usersController() {
  const service = usersService(collections);
  const books = booksService(collections);
  const tokens = tokenService();

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
      const token = await tokens.generateToken(null, login.username);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.json({ ok: true, ...login, token });
    } catch (error) {
      next(error);
    }
  }

  async function logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token");
      res.json({ message: "Cookies cleared" });
    } catch (error) {
      next(error);
    }
  }

  async function favorite(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.params.username;
      const favoriteBooksIds = await service.getFavoriteBooks(username);
      const favoriteBooks = await books.getBatch(favoriteBooksIds);

      res.json(favoriteBooks);
    } catch (error) {
      next(error);
    }
  }

  return { login, logout, getAll, favorite };
}

export default usersController;
