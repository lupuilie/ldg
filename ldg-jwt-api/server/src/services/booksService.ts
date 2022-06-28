import createHttpError from "http-errors";
import Book from "../models/book";
import { DbCollections } from "./dbService";

function booksService(collections: DbCollections) {
  async function getAll() {
    const books = await collections.books?.find<Book>({}).toArray();
    return books;
  }

  return { getAll };
}

export default booksService;
