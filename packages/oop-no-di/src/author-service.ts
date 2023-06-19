import authorDao from "./author-dao";

export interface AuthorDTO {
  id: string;
  name: string;
}
class AuthorService {
  public async getOne(id: string): Promise<AuthorDTO | null> {
    const authorDoc = await authorDao.getOne(id);
    if(!authorDoc) {
      return null;
    }
    return {
      id: authorDoc._id.toString(),
      name: authorDoc.name
    };
  }
}
const authorService = new AuthorService();
export default authorService;
