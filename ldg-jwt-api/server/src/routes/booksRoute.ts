import { Router } from "express";
import booksController from "../controllers/booksController";

const booksRoute = Router();
const controller = booksController();

booksRoute.route("/").get(controller.getAll).post(controller.add);

export default booksRoute;
