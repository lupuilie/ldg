import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";

import routes from "./routes";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../logs/access.log")
);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(morgan("common", { stream: accessLogStream }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
