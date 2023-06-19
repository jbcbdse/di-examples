import { WithId } from "mongodb";
import * as authorService from "./author-service";
import * as bookDao from "./book-dao";

export interface BookDTO {
  id: string;
  name: string;
  author: authorService.AuthorDTO | null;
}


export async function list(): Promise<BookDTO[]> {
  const bookDocuments = await bookDao.list();
  return Promise.all(bookDocuments.map(toDTO));
}

export async function getOne(id: string): Promise<BookDTO | null> {
  const bookDocument = await bookDao.getOne(id);
  if (bookDocument) {
    return toDTO(bookDocument);
  }
  return null;
}

async function toDTO(doc: WithId<bookDao.BookDocument>): Promise<BookDTO> {
  return {
    id: doc._id.toString(),
    name: doc.name,
    author: await authorService.getOne(doc.author.toString())
  };
}
