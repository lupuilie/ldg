import { ObjectId } from "mongodb";

export interface Todo {
  _id?: ObjectId;
  id?: number;
  title: string;
  description: string;
  dueDate?: string | null;
  isComplete?: boolean;
}
