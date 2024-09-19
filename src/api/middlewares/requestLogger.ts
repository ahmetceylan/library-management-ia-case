import { NextFunction, Request, Response } from "express";
import * as winston from 'winston';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  //Logging purpose
  // a middleware function with no mount path. This code is executed for every request to the router
  winston.info('Request:' + req.originalUrl + ' Time: ' + new Date());
  next();
};

export default requestLogger;