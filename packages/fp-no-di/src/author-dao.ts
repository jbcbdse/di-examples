import { ObjectId } from "mongodb";
import getConnection from "./mongo-connector";

interface AuthorDocument {
  name: string;
}

const collection = getConnection().db().collection<AuthorDocument>("authors");
export function getOne(id: string) {
  return collection.findOne({ _id: new ObjectId(id) });
}
