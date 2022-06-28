import app from "./app";
import { dbConnect } from "./services/dbService";
import { APP_CONFIG, MONGO_CONFIG } from "./config";

async function main() {
  await dbConnect(MONGO_CONFIG.MONGO_URI, MONGO_CONFIG.MONGO_DB);

  app.listen(APP_CONFIG.PORT, () => {
    console.log(`Server started at port ${APP_CONFIG.PORT}`);
  });
}

main();
