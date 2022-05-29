import http, { IncomingMessage, Server, ServerResponse } from "http";
import { HTTPMethod } from "./enums";
import { URL } from "url";
import { match } from "node-match-path";

export default class APIServer {
  private _server: Server;
  private _PORT: number = 3000;

  constructor() {
    this._server = http.createServer();
  }

  public server() {
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

  public start() {
    this._server.listen(this._PORT, () => {
      console.log(`Server listening on port ${this._PORT}`);
    });
  }
}
