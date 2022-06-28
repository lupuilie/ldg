import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRoute = Router();
const controller = usersController();

usersRoute.get("/", controller.getAll);
usersRoute.post("/login", controller.login);

export default usersRoute;
