import { Router } from "express";
import booksController from "../controllers/booksController";
import authenticate from "../middlewares/authenticate";

const booksRoute = Router();
const controller = booksController();

booksRoute.use("/", authenticate);
booksRoute.route("/").get(controller.getAll).post(controller.add);

export default booksRoute;
