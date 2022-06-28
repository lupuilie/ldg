import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public username: string,
    public key: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public id: string,
    public _id: ObjectId
  ) {}
}
