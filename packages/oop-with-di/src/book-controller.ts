import { NextFunction, Request, Response } from "express";
import BookService from "./book-service";
export default class BookController {
  constructor(private bookService: BookService) {}

  public list = async (req: Request, res: Response, next: NextFunction) => {
    const books = await this.bookService.list();
    res.json(books);
    next();
  }

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const books = await this.bookService.getOne(req.params.id);
    res.json(books);
    next();
  }
}
