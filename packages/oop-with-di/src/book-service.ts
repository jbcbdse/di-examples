import { WithId } from "mongodb";
import AuthorService, { AuthorDTO } from "./author-service";
import BookDAO, { BookDocument } from "./book-dao";

export interface BookDTO {
  id: string;
  name: string;
  author: AuthorDTO | null;
}
export default class BookService {
  constructor(private bookDao: BookDAO, private authorService: AuthorService) {}

  public async list(): Promise<BookDTO[]> {
    const bookDocuments = await this.bookDao.list();
    return Promise.all(bookDocuments.map(this.toDTO));
  }

  public async getOne(id: string): Promise<BookDTO | null> {
    const bookDocument = await this.bookDao.getOne(id);
    if (bookDocument) {
      return this.toDTO(bookDocument);
    }
    return null;
  }

  public async toDTO(doc: WithId<BookDocument>): Promise<BookDTO> {
    return {
      id: doc._id.toString(),
      name: doc.name,
      author: await this.authorService.getOne(doc.author.toString())
    };
  }
}
