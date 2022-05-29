import { Server } from "http";
import request from "supertest";

import { app } from "../src/app";
import { Todo } from "../src/interfaces";

let server: Server;
beforeEach(async () => {
  server = app.server();
});

afterEach(() => {
  server.close();
});

describe("ToDo Web Service", () => {
  test("should be no todos initially", async () => {
    const response = await request(server).get("/todos");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
  test("should be able to add (POST Req.) a todo with no errors", async () => {
    const response = await request(server)
      .post("/todos")
      .send({ title: "Title 1", description: "Description 1" });
    const todo: Todo = response.body;
    expect(response.statusCode).toBe(200);
    expect(todo.title).toBe("Title 1");
    expect(todo.description).toBe("Description 1");
  });
  test("add multiple ToDos with no errors", async () => {
    const todos: Todo[] = [
      { title: "Go shopping", description: "Anything excepting junk food" },
      { title: "Wash clothes", description: "Use 1 hour program" },
    ];
    for await (const todo of todos) {
      const response = await request(server).post("/todos").send(todo);
      expect(response.body).toMatchObject(todo);
    }
  });
  test("get all todos", async () => {
    const response = await request(server).get("/todos");
    const todos: Todo[] = response.body;
    expect(todos.length).toBe(3);
  });
  test("get single todo and property <isComplete> to be <false>", async () => {
    const response = await request(server).get("/todos/1");
    const todo: Todo = response.body;
    expect(todo.title).toBe("Go shopping");
    expect(todo.description).toBe("Anything excepting junk food");
    expect(todo.isComplete).toBe(false);
  });
  test("update (PATCH) properties <title>, <description>, <dueDate> and <isComplete> ", async () => {
    const updated: Todo = {
      title: "Changed title",
      description: "Changed description",
      dueDate: "29-05-2022",
      isComplete: true,
    };
    const response = await request(server).patch("/todos/2").send(updated);
    expect(response.body).toMatchObject(updated);
  });
  test("delete todo should return <deleted = true>", async () => {
    const response = await request(server).delete("/todos/2");

    expect(response.body.deleted).toBe(true);
  });
});
