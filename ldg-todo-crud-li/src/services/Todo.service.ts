import { Todo } from "../interfaces";
import { collections } from "./database.service";

export class TodoService {
  constructor(private _todos: Todo[] = []) {}

  public async getAll(): Promise<Todo[]> {
    const todos = (await collections.todos
      ?.find({})
      .project({ _id: 0 })
      .toArray()) as Todo[];

    return todos || [];
  }

  public async getById(id: number): Promise<Todo | null> {
    const todo = await collections.todos?.findOne<Todo>(
      { id },
      { projection: { _id: 0 } }
    );
    if (todo === null) {
      throw new Error(`todo with id <${id}> cannot be found`);
    }

    return todo || null;
  }

  public async add(todo: Todo): Promise<Todo> {
    if (todo.title === undefined) throw new Error(`'title' not provided`);
    if (todo.description === undefined)
      throw new Error(`'description' not provided`);

    const todoCount = await collections.todos?.count({});
    if (todoCount === undefined) {
      throw new Error("cannot add new todo");
    }

    const newTodo: Todo = {
      id: todoCount + 1,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate || null,
      isComplete: todo.isComplete || false,
    };

    await collections.todos?.insertOne(newTodo);

    const { _id, ...addedTodo } = newTodo;

    return addedTodo;
  }

  public async update(id: number, todoProps: Todo): Promise<Todo> {
    const updatedTodo = await collections.todos?.findOneAndUpdate(
      { id },
      { $set: { ...todoProps } },
      { returnDocument: "after", projection: { _id: 0 } }
    );

    if (updatedTodo === undefined || updatedTodo.value === null) {
      throw new Error(`todo with id <${id}> cannot be updated`);
    }

    return updatedTodo.value as Todo;
  }

  public async delete(id: number): Promise<boolean> {
    const todo = await collections.todos?.deleteOne({ id });
    if (todo?.deletedCount === 0) {
      throw new Error(`cannot delete todo with id <${id}>`);
    }
    return true;
  }
}
