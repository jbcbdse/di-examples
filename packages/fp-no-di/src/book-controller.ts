import { NextFunction, Request, Response } from "express";
import * as bookService from "./book-service";

export async function list(req: Request, res: Response, next: NextFunction) {
  const books = await bookService.list();
  res.json(books);
  next();
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  const books = await bookService.getOne(req.params.id);
  res.json(books);
  next();
}
