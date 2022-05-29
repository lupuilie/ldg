import { IncomingMessage, ServerResponse } from "http";
import { StatusCode } from "../enums/errors";
import { ErrorHandling } from "./ErrorHandling";

export function NotFound(req: IncomingMessage, res: ServerResponse) {
  ErrorHandling.sendError(res, new Error("Not Found"), StatusCode.NotFound);
}
