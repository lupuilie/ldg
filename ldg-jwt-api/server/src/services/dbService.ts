import * as mongoDB from "mongodb";

export type DbCollections = {
  books?: mongoDB.Collection;
  users?: mongoDB.Collection;
};

export const collections: DbCollections = {};

export async function dbConnect(uri: string, dbName: string) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

  const db: mongoDB.Db = client.db(dbName);

  await client.connect();

  collections.books = db.collection("books");
  collections.users = db.collection("users");

  console.log(`Connected to ${db.databaseName}`);
}
