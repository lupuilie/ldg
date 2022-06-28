import { Db, MongoClient } from "mongodb";

export class Database {
  public client: MongoClient;
  public db: Db;

  constructor(uri: string, db: string) {
    this.client = new MongoClient(uri);
    this.db = this.client.db(db);
  }

  public async connect() {
    console.log("Database connected");
    await this.client.connect();

    return this;
  }

  public async close() {
    await this.client.close();
  }
}
