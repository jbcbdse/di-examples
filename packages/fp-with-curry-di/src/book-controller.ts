import { NextFunction, Request, Response } from "express";
import * as bookService from "./book-service";
export const list = (
  bookServiceList: bookService.TList
) => async (
  req: Request, res: Response, next: NextFunction
) => {
    const books = await bookServiceList();
    res.json(books);
    next();
  };

export const getOne = (
  bookServiceGetOne: bookService.TGetOne
) => async (
  req: Request, res: Response, next: NextFunction
) => {
    const books = await bookServiceGetOne(
      req.params.id
    );
    res.json(books);
    next();
  };
