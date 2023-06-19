import { Collection } from "mongodb";
import * as authorDao from "./author-dao";

export interface AuthorDTO {
  id: string;
  name: string;
}
export async function getOne(authorCollection: Collection<authorDao.AuthorDocument>, authorDaoGetOne: authorDao.TGetOne, id: string): Promise<AuthorDTO | null> {
  const authorDoc = await authorDaoGetOne(authorCollection, id);
  if (!authorDoc) {
    return null;
  }
  return {
    id: authorDoc._id.toString(),
    name: authorDoc.name
  };
}
export type TGetOne = typeof getOne;
