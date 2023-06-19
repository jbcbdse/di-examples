import { Collection, ObjectId } from "mongodb";

export interface AuthorDocument {
  name: string;
}

export default class AuthorDAO {
  constructor(private collection: Collection<AuthorDocument>) {}

  public async getOne(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}
