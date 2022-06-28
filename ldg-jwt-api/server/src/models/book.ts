import { ObjectId } from "mongodb";

export default class Book {
  constructor(
    public name: string,
    public author: string,
    public id: string,
    public _id: ObjectId
  ) {}
}
