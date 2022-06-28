import { BaseRepository } from "./base/BaseRepository";
import { Todo } from "../entities/Todo";

export class TodoRepository extends BaseRepository<Todo> {
  getAll(): Promise<Todo[]> {
    return this.find({} as Todo);
  }

  async add(todo: Todo): Promise<Todo> {
    const count = await this.countOfTodos();
    todo.id = count + 1;
    await this.create(todo);

    return todo;
  }

  countOfTodos(): Promise<number> {
    return this._collection.count({});
  }
}
