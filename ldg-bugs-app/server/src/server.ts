import app from "./app";
import { connect } from "./services/db";
const PORT = 8080;

async function start() {
  await connect();

  app.listen(PORT, () => {
    console.log(`App is running at port ${PORT} in ${app.get("env")} mode`);
  });
}

start();
