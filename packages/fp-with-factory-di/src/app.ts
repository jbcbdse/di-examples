import express from "express";
import getConnection from "./mongo-connector";
import config from "./config";
import { Collection } from "mongodb";
import authorDao, { AuthorDocument } from "./author-dao";
import authorService from "./author-service";
import bookDao, { BookDocument } from "./book-dao";
import bookService from "./book-service";
import bookController from "./book-controller";

const client = getConnection(config);

const authorCollection: Collection<AuthorDocument> = client.db().collection<AuthorDocument>("authors");
const myAuthorDao = authorDao(authorCollection);
const myAuthorService = authorService(myAuthorDao);
const bookCollection: Collection<BookDocument> = client.db().collection<BookDocument>("books");
const myBookDao = bookDao(bookCollection);
const myBookService = bookService(myBookDao, myAuthorService);
const myBookController = bookController(myBookService);


const app = express();
app.get("/books", myBookController.list);
app.get("/books/:id", myBookController.getOne);
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
