import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";
import Book from "../models/book";

import booksService from "../services/booksService";
import { collections } from "../services/dbService";

function booksController() {
  const service = booksService(collections);

  async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await service.getAll();
      res.json({ books });
    } catch (error) {
      next(error);
    }
  }

  async function add(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, author } = req.body;
      const id = uuid();
      const newBook = new Book(name, author, id, new ObjectId());
      const added = await service.add(newBook);

      res.json(added);
    } catch (error) {
      next(error);
    }
  }

  return { getAll, add };
}

export default booksController;
