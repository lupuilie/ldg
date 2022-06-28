import { Router } from "express";

import usersRoute from "./usersRoute";
import booksRoute from "./booksRoute";

const router = Router();

router.use("/users", usersRoute);
router.use("/books", booksRoute);

export default router;
