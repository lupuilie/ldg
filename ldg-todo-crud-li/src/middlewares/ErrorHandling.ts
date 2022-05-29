import { ServerResponse } from "http";
import { StatusCode } from "../enums/errors";

export class ErrorHandling {
  static sendError(
    response: ServerResponse,
    error: unknown,
    statusCode?: StatusCode
  ) {
    let errorMessage = "Something bad happend. Try again later";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    response.statusCode = statusCode || 400;
    response.end(JSON.stringify({ error: errorMessage }));
  }
}
