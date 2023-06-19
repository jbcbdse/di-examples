import { ObjectId, WithId } from "mongodb";
import getConnection from "./mongo-connector";

export interface BookDocument {
  name: string;
  author: ObjectId;
}

const collection = getConnection().db().collection<BookDocument>("books");

export async function getOne(id: string): Promise<WithId<BookDocument> | null> {
  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function list(): Promise<WithId<BookDocument>[]> {
  return await collection.find().toArray();
}

