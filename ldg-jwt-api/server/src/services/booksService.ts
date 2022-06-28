import createHttpError from "http-errors";
import { InsertOneResult } from "mongodb";
import Book from "../models/book";
import { DbCollections } from "./dbService";

function booksService(collections: DbCollections) {
  async function getAll() {
    if (!collections.books) throw new Error("cannot find any books");
    const books = await collections.books.find<Book>({}).toArray();
    return books;
  }

  async function add(book: Book) {
    if (!collections.books) throw new Error("cannot add book");
    if (!book.name || !book.author) {
      throw new createHttpError.BadRequest("name and author is required");
    }
    const added: InsertOneResult = await collections.books.insertOne(book);
    if (!added.insertedId) {
      throw new createHttpError.BadRequest("book could not be added");
    }

    return book;
  }

  return { getAll, add };
}

export default booksService;
