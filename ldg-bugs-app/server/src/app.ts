import express, { Application, Request, Response, NextFunction } from "express";
import logger from "morgan";

import routes from "./routes";
import { errorHandler } from "./middlewares";

const app: Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", process.env["CORS_ALLOW_ORIGIN"]);
  res.set("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(routes);
app.use(errorHandler);

export default app;
