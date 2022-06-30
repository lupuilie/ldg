import { Router } from "express";
import usersController from "../controllers/usersController";
import authenticate from "../middlewares/authenticate";

const usersRoute = Router();
const controller = usersController();

usersRoute.get("/", authenticate("SHOW_USERS"), controller.getAll);
usersRoute.post("/login", controller.login);
usersRoute.get("/logout", authenticate("LOGIN"), controller.logout);

export default usersRoute;
