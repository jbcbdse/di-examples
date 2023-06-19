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
const authorCollection: Collection<authorDao.AuthorDocument> = client.db().collection<authorDao.AuthorDocument>("authors");
const authorDaoGetOne = authorDao.getOne(authorCollection);
const authorServiceGetOne = authorService.getOne(authorDaoGetOne);
const bookCollection: Collection<bookDao.BookDocument> = client.db().collection<bookDao.BookDocument>("books");
const bookDaoList = bookDao.list(bookCollection);
const bookDaoGetOne = bookDao.getOne(bookCollection);
const bookServiceList = bookService.list(bookDaoList, authorServiceGetOne);
const bookServiceGetOne = bookService.getOne(bookDaoGetOne, authorServiceGetOne);
const bookControllerGetOne = bookController.getOne(bookServiceGetOne);
const bookControllerList = bookController.list(bookServiceList);

const app = express();
app.get("/books", bookControllerList);
app.get("/books/:id", bookControllerGetOne);
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
