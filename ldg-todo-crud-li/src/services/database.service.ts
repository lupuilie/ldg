import * as mongodb from "mongodb";
import * as dotenv from "dotenv";

export const collections: { todos?: mongodb.Collection } = {};

export async function database() {
  dotenv.config();

  const client: mongodb.MongoClient = new mongodb.MongoClient(
    process.env.DB_CONN_STRING as string
  );

  await client.connect();

  const db: mongodb.Db = client.db(process.env.DB_NAME);

  const todosCollection: mongodb.Collection = db.collection(
    process.env.TODOS_COLLECTION_NAME as string
  );

  collections.todos = todosCollection;

  console.log(
    `connect ok to ${db.databaseName}/${todosCollection.collectionName}`
  );
}
