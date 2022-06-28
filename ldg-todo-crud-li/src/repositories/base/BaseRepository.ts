import { IWrite } from "../interfaces/IWrite";
import { IRead } from "../interfaces/IRead";

import {
  MongoClient,
  Db,
  Collection,
  InsertOneResult,
  ModifyResult,
  UpdateResult,
  DeleteResult,
} from "mongodb";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: Collection;

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }

  async create(item: T): Promise<boolean> {
    const result: InsertOneResult = await this._collection.insertOne(item);
    return result.acknowledged.valueOf();
  }

  async update(id: string | number, item: T): Promise<boolean> {
    const updated: UpdateResult = await this._collection.updateOne(
      { id },
      { $set: { ...item } }
    );

    return updated.modifiedCount > 0;
  }

  async delete(id: string | number): Promise<boolean> {
    const deleted: DeleteResult = await this._collection.deleteOne({ id });
    if (deleted.deletedCount === 0) {
      throw new Error(`cannot delete item with id <${id}>`);
    }

    return deleted.deletedCount > 0;
  }

  async find(item: T): Promise<T[]> {
    return this._collection.find<T>(item).toArray();
  }

  async findOne(id: string | number): Promise<T> {
    const item = await this._collection.findOne<T>({ id });
    if (item === null) {
      throw new Error(`item with id <${id}> cannot be found`);
    }

    return item;
  }

  async findAndUpdate(id: string | number, item: T): Promise<T> {
    const updatedItem = await this._collection.findOneAndUpdate(
      { id },
      { $set: { ...item } },
      { returnDocument: "after" }
    );

    if (updatedItem.value === null) {
      throw new Error(`item with id <${id}> cannot be updated`);
    }

    return updatedItem.value as unknown as T;
  }
}
