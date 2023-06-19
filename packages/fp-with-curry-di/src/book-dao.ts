import { Collection, ObjectId, WithId } from "mongodb";

export interface BookDocument {
  name: string;
  author: ObjectId;
}

export const getOne = (collection: Collection<BookDocument>) => async (id: string): Promise<WithId<BookDocument> | null> => {
  return await collection.findOne({ _id: new ObjectId(id) });
};

export const list = (collection: Collection<BookDocument>) => async (): Promise<WithId<BookDocument>[]> => {
  return await collection.find().toArray();
};
export type TList = ReturnType<typeof list>;
export type TGetOne = ReturnType<typeof getOne>;

