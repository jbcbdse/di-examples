import { Collection, ObjectId, WithId } from "mongodb";

export interface BookDocument {
  name: string;
  author: ObjectId;
}

export async function getOne(collection: Collection<BookDocument>, id: string): Promise<WithId<BookDocument> | null> {
  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function list(collection: Collection<BookDocument>): Promise<WithId<BookDocument>[]> {
  return await collection.find().toArray();
}
export type TList = typeof list;
export type TGetOne = typeof getOne;

