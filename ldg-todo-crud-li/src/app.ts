import APIServer from "./ApiServer";
import { TodoController } from "./controllers";

export const app = new APIServer();

app.get("/", (req, res) => {
  res.end("GET /");
});
app.get("/todos", TodoController.get);
app.post("/todos", TodoController.add);
app.get("/todos/:id", TodoController.getById);
app.patch("/todos/:id", TodoController.update);
app.delete("/todos/:id", TodoController.delete);
