import http, { IncomingMessage, Server, ServerResponse } from "http";
import { HTTPMethod } from "./enums";
import { URL } from "url";
import { match } from "node-match-path";

import { Database } from "./services/database.service";
import { DB } from "./config";

import { Db } from "mongodb";

export default class APIServer {
  private _server: Server;
  private _PORT: number = 3000;

  private _database: Database;
  private _db: Db;

  constructor() {
    this._server = http.createServer();
    this._database = new Database(DB.CONN_STRING, DB.NAME);
    this._db = this._database.db;
  }

  public async start() {
    await this._database.connect();

    const PORT = process.env.PORT || this._PORT;
    this._server.listen(PORT, () =>
      console.log(`Server started: PORT <${PORT}>`)
    );
  }

  public setDb(db: Db) {
    this._db = db;
  }

  public getDb(): Db {
    return this._db;
  }

  public getDbName(): string {
    return this._db?.databaseName || "";
  }

  public getServer() {
    return this._server;
  }

  public close() {
    this._server.close();
  }

  private resolve(
    path: string,
    method: HTTPMethod,
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this._server.on("request", (req: IncomingMessage, res: ServerResponse) => {
      if (res.headersSent) return;

      const url = new URL(req.url as string, `http://${req.headers.host}`);

      if (match(path, url.pathname).matches && req.method === method) {
        // console.log(path, method);

        res.setHeader("Content-Type", "application/json");
        callback(req, res);
      }
    });
  }

  public get(
    path: string,
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this.resolve(path, HTTPMethod.GET, callback);
  }

  public post(
    path: string,
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this.resolve(path, HTTPMethod.POST, callback);
  }

  public patch(
    path: string,
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this.resolve(path, HTTPMethod.PATCH, callback);
  }

  public delete(
    path: string,
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this.resolve(path, HTTPMethod.DELETE, callback);
  }
}
