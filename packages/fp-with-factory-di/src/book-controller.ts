import { NextFunction, Request, Response } from "express";
import * as bookService from "./book-service";

const bookController = (bookService: bookService.TBookService) => {
  return {
    list: async (req: Request, res: Response, next: NextFunction) => {
      const books = await bookService.list();
      res.json(books);
      next();
    },

    getOne: async (req: Request, res: Response, next: NextFunction) => {
      const books = await bookService.getOne(req.params.id);
      res.json(books);
      next();
    }
  };
};
export default bookController;
export type TBookController = ReturnType<typeof bookController>;
