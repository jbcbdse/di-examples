import * as authorDao from "./author-dao";

export interface AuthorDTO {
  id: string;
  name: string;
}
export const getOne = (authorDaoGetOne: authorDao.TGetOne) => async (id: string): Promise<AuthorDTO | null> => {
  const authorDoc = await authorDaoGetOne(id);
  if (!authorDoc) {
    return null;
  }
  return {
    id: authorDoc._id.toString(),
    name: authorDoc.name
  };
};
export type TGetOne = ReturnType<typeof getOne>;
