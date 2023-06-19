import { Collection, ObjectId, WithId } from "mongodb";

export interface BookDocument {
  name: string;
  author: ObjectId;
}

export default class BookDAO {
  constructor(private collection: Collection<BookDocument>) {}


  public async getOne(id: string): Promise<WithId<BookDocument> | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async list(): Promise<WithId<BookDocument>[]> {
    return await this.collection.find().toArray();
  }
}
