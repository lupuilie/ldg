import { Todo } from "../interfaces";

export class TodoService {
  constructor(private _todos: Todo[] = []) {}

  public async getAll(): Promise<Todo[]> {
    return this._todos;
  }

  public async getById(id: number): Promise<Todo | null> {
    const todo = this._todos.find((todo) => todo.id === id);
    return todo || null;
  }

  public async add(todo: Todo): Promise<Todo> {
    if (todo.title === undefined) throw new Error(`'title' not provided`);
    if (todo.description === undefined)
      throw new Error(`'description' not provided`);

    const newTodo: Todo = {
      id: this._todos.length,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate || null,
      isComplete: todo.isComplete || false,
    };

    this._todos.push(newTodo);

    return newTodo;
  }

  public async update(id: number, todo: Todo): Promise<Todo> {
    const todoId = this._todos.findIndex((todo) => todo.id === id);

    // TODO: validations for <todo>
    this._todos[todoId] = todo;

    return this._todos[todoId];
  }

  public async delete(id: number): Promise<boolean> {
    const todoId = this._todos.findIndex((todo) => todo.id === id);
    if (todoId === -1) return false;

    this._todos.splice(todoId, 1);
    return true;
  }
}
