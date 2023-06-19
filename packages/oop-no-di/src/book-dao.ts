import { ObjectId, WithId } from "mongodb";
import mongoConnector from "./mongo-connector";

export interface BookDocument {
  name: string;
  author: ObjectId;
}

class BookDAO {
  private collection;

  constructor() {
    this.collection = mongoConnector.getConnection().db().collection<BookDocument>("books");
  }

  public async getOne(id: string): Promise<WithId<BookDocument> | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async list(): Promise<WithId<BookDocument>[]> {
    return await this.collection.find().toArray();
  }
}

const bookDao = new BookDAO();
export default bookDao;
