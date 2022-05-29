export interface Todo {
  id?: number;
  title: string;
  description: string;
  dueDate?: string | null;
  isComplete?: boolean;
}
