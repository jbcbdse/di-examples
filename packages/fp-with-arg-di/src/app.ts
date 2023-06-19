import express from "express";
import * as bookController from "./book-controller";
import getConnection from "./mongo-connector";
import config from "./config";
import * as bookService from "./book-service";
import * as bookDao from "./book-dao";
import * as authorDao from "./author-dao";
import * as authorService from "./author-service";
import { Collection } from "mongodb";

const client = getConnection(config);
const bookCollection: Collection<bookDao.BookDocument> = client.db().collection<bookDao.BookDocument>("books");
const authorCollection: Collection<authorDao.AuthorDocument> = client.db().collection<authorDao.AuthorDocument>("authors");

const app = express();
app.get("/books", (req, res, next) => {
  return bookController.list(
    bookCollection,
    bookDao.list,
    authorCollection,
    authorDao.getOne,
    authorService.getOne,
    bookService.list,
    req, res, next
  );
});
app.get("/books/:id", (req, res, next) => {
  return bookController.getOne(
    bookCollection,
    bookDao.getOne,
    authorCollection,
    authorDao.getOne,
    authorService.getOne,
    bookService.getOne,
    req, res, next
  );
});
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
