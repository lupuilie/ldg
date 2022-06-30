import { Router } from "express";
import booksController from "../controllers/booksController";
import authenticate from "../middlewares/authenticate";

const booksRoute = Router();
const controller = booksController();

booksRoute
  .route("/")
  .get(authenticate("SHOW_BOOKS"), controller.getAll)
  .post(authenticate("ADD_BOOKS"), controller.add);

export default booksRoute;
