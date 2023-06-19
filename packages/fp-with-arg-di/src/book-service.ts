import { Collection, WithId } from "mongodb";
import * as authorService from "./author-service";
import * as bookDao from "./book-dao";
import * as authorDao from "./author-dao";

export interface BookDTO {
  id: string;
  name: string;
  author: authorService.AuthorDTO | null;
}
export async function list(
  bookCollection: Collection<bookDao.BookDocument>,
  bookDaoList: bookDao.TList,
  authorCollection: Collection<authorDao.AuthorDocument>,
  authorDaoGetOne: authorDao.TGetOne,
  authorServiceGetOne: authorService.TGetOne
): Promise<BookDTO[]> {
  const bookDocuments = await bookDaoList(bookCollection);
  return Promise.all(bookDocuments.map(async (bookDocument) => {
    return toDTO(authorCollection, authorDaoGetOne, authorServiceGetOne, bookDocument);
  }));
}

export async function getOne(
  bookCollection: Collection<bookDao.BookDocument>,
  bookGetOne: bookDao.TGetOne,
  authorCollection: Collection<authorDao.AuthorDocument>,
  authorDaoGetOne: authorDao.TGetOne,
  authorServiceGetOne: authorService.TGetOne,
  id: string
): Promise<BookDTO | null> {
  const bookDocument = await bookGetOne(bookCollection, id);
  if (bookDocument) {
    return toDTO(authorCollection, authorDaoGetOne, authorServiceGetOne, bookDocument);
  }
  return null;
}

async function toDTO(
  authorCollection: Collection<authorDao.AuthorDocument>,
  authorDaoGetOne: authorDao.TGetOne,
  authorServiceGetOne: authorService.TGetOne,
  doc: WithId<bookDao.BookDocument>
): Promise<BookDTO> {
  return {
    id: doc._id.toString(),
    name: doc.name,
    author: await authorServiceGetOne(authorCollection, authorDaoGetOne, doc._id.toString())
  };
}


export type TList = typeof list;
export type TGetOne = typeof getOne;
