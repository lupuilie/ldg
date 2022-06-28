import { Request, Response, NextFunction } from "express";

import booksService from "../services/booksService";
import { collections } from "../services/dbService";

function booksController() {
  const service = booksService(collections);

  async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await service.getAll();
      res.json(books);
    } catch (error) {
      next(error);
    }
  }

  return { getAll };
}

export default booksController;
