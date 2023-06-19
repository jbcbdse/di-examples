import { Collection, ObjectId } from "mongodb";

export interface AuthorDocument {
  name: string;
}

export const getOne = (collection: Collection<AuthorDocument>) => (id: string) => {
  return collection.findOne({ _id: new ObjectId(id) });
};
export type TGetOne = ReturnType<typeof getOne>;
