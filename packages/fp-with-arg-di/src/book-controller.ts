import { NextFunction, Request, Response } from "express";
import * as bookService from "./book-service";
import * as bookDao from "./book-dao";
import * as authorDao from "./author-dao";
import * as authorService from "./author-service";
import { Collection } from "mongodb";
export async function list(
  bookCollection: Collection<bookDao.BookDocument>,
  bookDaoList: bookDao.TList,
  authorCollection: Collection<authorDao.AuthorDocument>,
  authorDaoGetOne: authorDao.TGetOne,
  authorServiceGetOne: authorService.TGetOne,
  bookServiceList: bookService.TList,
  req: Request, res: Response, next: NextFunction) {
  const books = await bookServiceList(
    bookCollection,
    bookDaoList,
    authorCollection,
    authorDaoGetOne,
    authorServiceGetOne
  );
  res.json(books);
  next();
}

export async function getOne(
  bookCollection: Collection<bookDao.BookDocument>,
  bookDaoGetOne: bookDao.TGetOne,
  authorCollection: Collection<authorDao.AuthorDocument>,
  authorDaoGetOne: authorDao.TGetOne,
  authorServiceGetOne: authorService.TGetOne,
  bookServiceGetOne: bookService.TGetOne,
  req: Request, res: Response, next: NextFunction) {
  const books = await bookServiceGetOne(
    bookCollection,
    bookDaoGetOne,
    authorCollection,
    authorDaoGetOne,
    authorServiceGetOne,
    req.params.id
  );
  res.json(books);
  next();
}
