import { IncomingMessage, ServerResponse } from "http";
import { ErrorHandling } from "../middlewares";
import { parseRequestBody } from "../utils";
import { StatusCode } from "../enums/errors";
import { app } from "../app";

import { Todo } from "../entities/Todo";
import { TodoRepository } from "../repositories/TodoRepository";

export class TodoController {
  public async get(req: IncomingMessage, res: ServerResponse) {
    try {
      const repository = new TodoRepository(app.getDb(), "todos");
      const todos = await repository.getAll();

      res.end(JSON.stringify({ todos }));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ServerError);
    }
  }

  public async getById(req: IncomingMessage, res: ServerResponse) {
    try {
      const repository = new TodoRepository(app.getDb(), "todos");
      const url = new URL(req.url as string, `http://${req.headers.host}`);
      const urlMatch = url.pathname.match(/^([/todos]+)\/(\w+)\/?$/) || [];
      const id = Number(urlMatch[2]);

      if (isNaN(id)) {
        throw new Error("id should be a number");
      }

      const todo: Todo = await repository.findOne(id);

      res.end(JSON.stringify(todo));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }

  public async add(req: IncomingMessage, res: ServerResponse) {
    try {
      const repository = new TodoRepository(app.getDb(), "todos");
      const todo: Todo = await parseRequestBody(req);
      const newTodo = new Todo(todo.title, todo.description, todo.dueDate);

      await repository.add(newTodo);

      res.end(JSON.stringify(newTodo));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }

  public async update(req: IncomingMessage, res: ServerResponse) {
    try {
      const repository = new TodoRepository(app.getDb(), "todos");
      const url = new URL(req.url as string, `http://${req.headers.host}`);
      const urlMatch = url.pathname.match(/^([/todos]+)\/(\w+)\/?$/) || [];
      const id = Number(urlMatch[2]);

      if (isNaN(id)) {
        throw new Error("id should be a number");
      }

      const todoUpdateProps: Todo = await parseRequestBody(req);
      const updated = await repository.findAndUpdate(id, todoUpdateProps);

      res.end(JSON.stringify(updated));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }

  public async delete(req: IncomingMessage, res: ServerResponse) {
    try {
      const repository = new TodoRepository(app.getDb(), "todos");
      const url = new URL(req.url as string, `http://${req.headers.host}`);
      const urlMatch = url.pathname.match(/^([/todos]+)\/(\w+)\/?$/) || [];
      const id = Number(urlMatch[2]);

      if (isNaN(id)) {
        throw new Error("id should be a number");
      }

      const deleted = await repository.delete(id);
      if (!deleted) {
        throw new Error(`cannot delete todo <${id}>`);
      }

      res.end(JSON.stringify({ deleted: true }));
    } catch (error) {
      ErrorHandling.sendError(res, error, StatusCode.ClientError);
    }
  }
}
