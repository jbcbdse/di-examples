import AuthorDAO from "./author-dao";

export interface AuthorDTO {
  id: string;
  name: string;
}
export default class AuthorService {
  constructor(private authorDao: AuthorDAO) {}

  public async getOne(id: string): Promise<AuthorDTO | null> {
    const authorDoc = await this.authorDao.getOne(id);
    if (!authorDoc) {
      return null;
    }
    return {
      id: authorDoc._id.toString(),
      name: authorDoc.name
    };
  }
}
