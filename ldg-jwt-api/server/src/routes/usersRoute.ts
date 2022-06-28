import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRoute = Router();
const controller = usersController();

usersRoute.post("/login", controller.login);

export default usersRoute;
