import { WithId } from "mongodb";
import * as authorService from "./author-service";
import * as bookDao from "./book-dao";

export interface BookDTO {
  id: string;
  name: string;
  author: authorService.AuthorDTO | null;
}
export const list = (
  bookDaoList: bookDao.TList,
  authorServiceGetOne: authorService.TGetOne
) => async (): Promise<BookDTO[]> => {
  const docToDTO = toDTO(authorServiceGetOne);
  const bookDocuments = await bookDaoList();
  return Promise.all(bookDocuments.map(async (bookDocument) => {
    return docToDTO(bookDocument);
  }));
};

export const getOne = (
  bookDaoGetOne: bookDao.TGetOne,
  authorServiceGetOne: authorService.TGetOne
) => async (
  id: string
): Promise<BookDTO | null> => {
    const docToDTO = toDTO(authorServiceGetOne);
    const bookDocument = await bookDaoGetOne(id);
    if (bookDocument) {
      return docToDTO(bookDocument);
    }
    return null;
  };

const toDTO = (authorServiceGetOne: authorService.TGetOne) => async (doc: WithId<bookDao.BookDocument>): Promise<BookDTO> => {
  return {
    id: doc._id.toString(),
    name: doc.name,
    author: await authorServiceGetOne(doc._id.toString())
  };
};


export type TList = ReturnType<typeof list>;
export type TGetOne = ReturnType<typeof getOne>;
