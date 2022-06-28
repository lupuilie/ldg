export class Todo {
  public id?: number;
  constructor(
    public title: string,
    public description: string,
    public dueDate: string | null = null,
    public isComplete: boolean = false
  ) {}
}
