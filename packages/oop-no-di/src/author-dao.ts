import { ObjectId } from "mongodb";
import mongoConnector from "./mongo-connector";

interface AuthorDocument {
  name: string;
}

class AuthorDAO {
  private collection;

  constructor() {
    this.collection = mongoConnector.getConnection().db().collection<AuthorDocument>("authors");
  }

  public async getOne(id: string) {
    return this.collection.findOne({_id: new ObjectId(id)});
  }
}

const authorDao = new AuthorDAO();
export default authorDao;
