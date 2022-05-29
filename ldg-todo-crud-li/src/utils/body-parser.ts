import { IncomingMessage } from "http";

export async function parseRequestBody<T>(request: IncomingMessage) {
  return new Promise<T>((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", async () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Request body could not be parsed"));
      }
    });
  });
}
