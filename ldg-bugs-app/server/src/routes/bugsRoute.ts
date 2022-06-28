import { Router } from "express";
import { BugsController } from "../controllers/bugsController";

const router = Router();

router.route("/").get(BugsController.getAll).post(BugsController.create);

router
  .use("/:id", BugsController.getById)
  .route("/:id")
  .get(BugsController.bugWithId)
  .put(BugsController.update)
  .delete(BugsController.delete);

export default router;
