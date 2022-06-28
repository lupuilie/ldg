import { Server } from "http";
import { Db, MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

import { app } from "../src/app";
import { Todo } from "../src/entities/Todo";

describe("ToDo Web Service", () => {
  const server: Server = app.getServer();
  let mongoServer: MongoMemoryServer;
  let mongoClient: MongoClient;
  let dbName: string;
  let db: Db;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    dbName = mongoServer.instanceInfo!.dbName;
    mongoClient = await new MongoClient(mongoServer.getUri()).connect();
    db = mongoClient.db(dbName);
    app.setDb(db);
  });

  afterAll(async () => {
    await mongoClient.close();
    await mongoServer.stop();
  });

  test("should be no todos initially", async () => {
    const response = await request(server).get("/todos");
    expect(response.body.todos).toEqual([]);
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

  test("adding multiple ToDos with no errors", async () => {
    const todos: Todo[] = [
      new Todo("Go shopping", "Anything excepting junk food"),
      new Todo("Wash clothes", "Use 1 hour program"),
    ];

    for await (const todo of todos) {
      const response = await request(server).post("/todos").send(todo);
      expect(response.body).toMatchObject(todo);
    }
  });

  test("get all todos", async () => {
    const response = await request(server).get("/todos");
    const todos: Todo[] = response.body.todos;

    expect(todos.length).toBe(3);
  });

  test("get todo with id <2> and property <isComplete> should be <false>", async () => {
    const response = await request(server).get("/todos/2");
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

  test("delete todo width id <2> should return <deleted = true>", async () => {
    const response = await request(server).delete("/todos/2");

    expect(response.body.deleted).toBe(true);
  });
});
