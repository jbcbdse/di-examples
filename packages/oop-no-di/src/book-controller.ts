import { NextFunction, Request, Response } from "express";
import bookService from "./book-service";
class BookController {
  public async list(req: Request, res: Response, next: NextFunction) {
    const books = await bookService.list();
    res.json(books);
    next();
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    const books = await bookService.getOne(req.params.id);
    res.json(books);
    next();
  }
}
const bookController = new BookController();
export default bookController;
