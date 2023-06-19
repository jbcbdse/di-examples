import { Collection, ObjectId } from "mongodb";

export interface AuthorDocument {
  name: string;
}

const authorDao = (collection: Collection<AuthorDocument>) => {
  return {
    getOne: (id: string) => {
      return collection.findOne({ _id: new ObjectId(id) });
    }
  };
};
export default authorDao;
export type TAuthorDao = ReturnType<typeof authorDao>;
