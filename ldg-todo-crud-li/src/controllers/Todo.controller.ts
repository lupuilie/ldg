import { IncomingMessage, ServerResponse } from "http";
import { TodoService } from "../services/Todo.service";
import { ErrorHandling } from "../middlewares";
import { parseRequestBody } from "../utils";
import { Todo } from "../interfaces";
import { StatusCode } from "../enums/errors";

const todoService = new TodoService();

export class TodoController {
  public async get(req: IncomingMessage, res: ServerResponse) {
    try {
      const todos = await todoService.getAll();
      res.end(JSON.stringify({ todos }));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ServerError);
    }
  }

  public async getById(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url as string, `http://${req.headers.host}`);
      const urlMatch = url.pathname.match(/^([/todos]+)\/(\w+)\/?$/) || [];
      const id = Number(urlMatch[2]);

      if (isNaN(id)) {
        throw new Error("id should be a number");
      }

      const todo = await todoService.getById(Number(id));

      res.end(JSON.stringify(todo));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }

  public async add(req: IncomingMessage, res: ServerResponse) {
    try {
      const todo: Todo = await parseRequestBody(req);
      const newTodo = await todoService.add(todo);

      res.end(JSON.stringify(newTodo));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }

  public async update(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url as string, `http://${req.headers.host}`);
      const urlMatch = url.pathname.match(/^([/todos]+)\/(\w+)\/?$/) || [];
      const id = Number(urlMatch[2]);

      if (isNaN(id)) {
        throw new Error("id should be a number");
      }

      const todoUpdateProps: Todo = await parseRequestBody(req);
      const updatedTodo: Todo = await todoService.update(id, todoUpdateProps);

      res.end(JSON.stringify(updatedTodo));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }

  public async delete(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url as string, `http://${req.headers.host}`);
      const urlMatch = url.pathname.match(/^([/todos]+)\/(\w+)\/?$/) || [];
      const id = Number(urlMatch[2]);

      if (isNaN(id)) {
        throw new Error("id should be a number");
      }
      const deleted = await todoService.delete(id);
      if (!deleted) {
        throw new Error(`cannot delete todo <${id}>`);
      }

      res.end(JSON.stringify({ deleted: true }));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }
}
