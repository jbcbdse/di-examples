import { WithId } from "mongodb";
import authorService, { AuthorDTO } from "./author-service";
import bookDao, { BookDocument } from "./book-dao";

export interface BookDTO {
  id: string;
  name: string;
  author: AuthorDTO | null;
}
class BookService {
  public async list(): Promise<BookDTO[]> {
    const bookDocuments = await bookDao.list();
    return Promise.all(bookDocuments.map(this.toDTO));
  }

  public async getOne(id: string): Promise<BookDTO | null> {
    const bookDocument = await bookDao.getOne(id);
    if (bookDocument) {
      return this.toDTO(bookDocument);
    }
    return null;
  }

  public async toDTO(doc: WithId<BookDocument>): Promise<BookDTO> {
    return {
      id: doc._id.toString(),
      name: doc.name,
      author: await authorService.getOne(doc.author.toString())
    };
  }
}
const bookService = new BookService();
export default bookService;
