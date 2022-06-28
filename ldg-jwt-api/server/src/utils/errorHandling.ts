import createHttpError, { isHttpError } from "http-errors";

export function buildErrorObject(error: any) {
  const errorObject = {
    name: "UnhandledError",
    message: "Unhandled Exception",
    status: 500,
    ok: false,
  };
  if (isHttpError(error)) {
    errorObject.name = error.name;
    errorObject.message = error.message;
    errorObject.status = error.status;
    return errorObject;
  }
  if (error instanceof Error) {
    errorObject.name = error.name;
    errorObject.message = error.message;
    errorObject.status = 500;
    return errorObject;
  }
}
