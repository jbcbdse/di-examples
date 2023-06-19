import { WithId } from "mongodb";
import { AuthorDTO, TAuthorService } from "./author-service";
import { BookDocument, TBookDao } from "./book-dao";

export interface BookDTO {
  id: string;
  name: string;
  author: AuthorDTO | null;
}

const bookService = (bookDao: TBookDao, authorService: TAuthorService) => {
  const toDTO = async (doc: WithId<BookDocument>): Promise<BookDTO> => {
    return {
      id: doc._id.toString(),
      name: doc.name,
      author: await authorService.getOne(doc._id.toString())
    };
  };
  return {
    list: async (): Promise<BookDTO[]> => {
      const bookDocuments = await bookDao.list();
      return Promise.all(bookDocuments.map(toDTO));
    },

    getOne: async (id: string): Promise<BookDTO | null> => {
      const bookDocument = await bookDao.getOne(id);
      if (bookDocument) {
        return toDTO(bookDocument);
      }
      return null;
    }
  };
};

export default bookService;
export type TBookService = ReturnType<typeof bookService>;
