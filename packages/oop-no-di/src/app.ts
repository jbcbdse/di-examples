import express from "express";
import bookController from "./book-controller";
import config from "./config";
const app = express();
app.get("/books:id", bookController.getOne);
app.get("/books", bookController.list);
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
