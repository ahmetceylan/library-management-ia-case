import express, { Application } from'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import errorMiddleware from '../middlewares/error';
import requestLogger from '../middlewares/requestLogger';
import notFound from '../middlewares/notFound';
import appRoutes from './routes';
class Router {
  expressApp;
  constructor(app: Application) {
    this.expressApp = app
  }
  
/**
 * Adds express middlewares
 * @param {*} app 
 */
initMiddlewares = () => {
  this.expressApp.use(express.urlencoded({ extended: true }));
  this.expressApp.use(bodyParser.json());
  this.expressApp.use(cors());

  // Helmet helps us secure our Express apps by setting various HTTP headers
  this.expressApp.use(helmet()); 
  
  // Rate Limiter
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  // app.set('trust proxy', 1);
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  this.expressApp.use(limiter);
}

/**
 * Adds application routes
 */
initApplicationRoutes = () => {
  this.expressApp.use('/', appRoutes);
}

/**
 * Adds custom middlewares for logging and error handling
 */
initCustomMiddlewares = () => {
  // Custom Middlewares
  this.expressApp.use(errorMiddleware);
  this.expressApp.use(requestLogger);
  this.expressApp.use(notFound);
}


initRouter = () => {
  this.initMiddlewares();
  this.initApplicationRoutes();
  this.initCustomMiddlewares();
};

}

export default Router;