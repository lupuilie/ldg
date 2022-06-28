import { Request } from "express";
import createHttpError from "http-errors";

export function getAuthCredentials(req: Request) {
  const base64Encoding = req.headers.authorization?.split(" ")[1];
  if (!base64Encoding) {
    throw new createHttpError.BadRequest(
      "request authorization headers not sent"
    );
  }
  const credentials = Buffer.from(base64Encoding, "base64")
    .toString()
    .split(":");
  const [username, password] = credentials;
  if (!username || !password)
    throw new createHttpError.BadRequest("username and password must be sent");

  return { username, password };
}
