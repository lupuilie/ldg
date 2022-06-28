import { getDb } from "../services/db";
import { IBug, Bug } from "../entities/bug";
import { DeleteResult, InsertOneResult, ModifyResult, ObjectId } from "mongodb";
import HttpError from "http-errors";

const collection = getDb().collection<IBug>("bugs");

export const BugsRepository = {
  async getAllBugs(): Promise<IBug[]> {
    const bugs = await collection.find({}).toArray();
    return bugs;
  },

  async getBug(id: ObjectId): Promise<IBug> {
    const bug = await collection.findOne({ _id: id });
    if (bug === null) {
      throw new HttpError.NotFound(`item with id <${id}> cannot be found`);
    }
    return bug;
  },

  async add(bug: Bug) {
    const query: InsertOneResult = await collection.insertOne(bug);
    return query.acknowledged;
  },

  async update(bug: Bug, newProps: IBug) {
    const updated: ModifyResult<IBug> = await collection.findOneAndUpdate(
      { _id: bug._id },
      { $set: { ...newProps, updatedOn: new Date() } },
      { returnDocument: "after" }
    );

    return updated.value;
  },

  async remove(id: ObjectId) {
    const removed: DeleteResult = await collection.deleteOne({ _id: id });

    return { deleted: removed.deletedCount > 0 };
  },
};
