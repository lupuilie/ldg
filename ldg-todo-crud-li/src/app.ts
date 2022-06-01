import APIServer from "./ApiServer";
import { database } from "./services/database.service";
import { TodoController } from "./controllers";
import { NotFound } from "./middlewares/NotFound";

export const app = new APIServer();

async function main() {
  await database();

  app.get("/", (req, res) => {
    res.end("GET /");
  });

  app.get("/todos", TodoController.get);
  app.post("/todos", TodoController.add);
  app.get("/todos/:id", TodoController.getById);
  app.patch("/todos/:id", TodoController.update);
  app.delete("/todos/:id", TodoController.delete);

  // app.get("*", NotFound);

  app.start();
}

main();
