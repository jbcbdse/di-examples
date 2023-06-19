import { TAuthorDao } from "./author-dao";

export interface AuthorDTO {
  id: string;
  name: string;
}

const authorService = (authorDao: TAuthorDao) => {
  return {
    getOne: async (id: string): Promise<AuthorDTO | null> => {
      const authorDoc = await authorDao.getOne(id);
      if (!authorDoc) {
        return null;
      }
      return {
        id: authorDoc._id.toString(),
        name: authorDoc.name
      };
    }
  };
};
export default authorService;
export type TAuthorService = ReturnType<typeof authorService>;
