import express from "express";
import BookController from "./book-controller";
import BookService from "./book-service";
import BookDAO, { BookDocument } from "./book-dao";
import { MongoClient } from "mongodb";
import Config from "./config";
import AuthorDAO, { AuthorDocument } from "./author-dao";
import AuthorService from "./author-service";

const config = new Config();
const mongoClient = new MongoClient(config.connectionString);
const booksCollection = mongoClient.db().collection<BookDocument>("books");
const authorsCollection = mongoClient.db().collection<AuthorDocument>("authors");
const bookDao = new BookDAO(booksCollection);
const authorDao = new AuthorDAO(authorsCollection);
const authorService = new AuthorService(authorDao);
const bookService = new BookService(bookDao, authorService);
const bookController = new BookController(bookService);

const app = express();
app.get("/books", bookController.list);
app.get("/books:id", bookController.getOne);
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
