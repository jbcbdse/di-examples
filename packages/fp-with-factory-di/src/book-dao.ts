import { Collection, ObjectId, WithId } from "mongodb";

export interface BookDocument {
  name: string;
  author: ObjectId;
}

const bookDao = (collection: Collection<BookDocument>) => {
  return {
    getOne: async (id: string): Promise<WithId<BookDocument> | null> => {
      return await collection.findOne({ _id: new ObjectId(id) });
    },

    list: async (): Promise<WithId<BookDocument>[]> => {
      return await collection.find().toArray();
    }
  };
};
export default bookDao;
export type TBookDao = ReturnType<typeof bookDao>;

