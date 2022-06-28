import { Router } from "express";
import booksController from "../controllers/booksController";

const booksRoute = Router();
const controller = booksController();

booksRoute.get("/", controller.getAll);

export default booksRoute;
