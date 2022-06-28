import { ObjectId } from "mongodb";

export interface IBug {
  _id?: ObjectId;
  title: string;
  description: string;
  createdOn: Date;
  updatedOn: Date;
  status: string;
}

export class Bug implements IBug {
  _id?: ObjectId;
  createdOn: Date;
  updatedOn: Date;
  status: string;

  constructor(public title: string, public description: string) {
    this.createdOn = new Date();
    this.updatedOn = new Date();
    this.status = "NEW";
  }
}
