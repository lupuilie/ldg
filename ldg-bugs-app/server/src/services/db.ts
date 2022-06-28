import { Db, MongoClient } from "mongodb";
import { MONGO_CONFIG } from "../config";

const client: MongoClient = new MongoClient(MONGO_CONFIG.MONGO_URI as string);
let db: Db = client.db(MONGO_CONFIG.MONGO_DB);

export function setDb(otherDb: Db) {
  db = otherDb;
}

export function getDb() {
  return db;
}

export async function connect() {
  await client.connect();
  console.log("MongoDB Connected");
}

export async function close() {
  await client.close();
}
