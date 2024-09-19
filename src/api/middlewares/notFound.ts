import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  // catch 404 and forward to error handler
  return res.status(404).json({
    msg: 'Not Found'
  });
};

export default notFound;