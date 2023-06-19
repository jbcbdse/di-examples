import express from "express";
import * as bookController from "./book-controller";
import config from "./config";
const app = express();
app.get("/books", bookController.list);
app.get("/books:id", bookController.getOne);
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
