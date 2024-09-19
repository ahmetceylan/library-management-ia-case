
import winston from 'winston';
import  express  from 'express';
import dotenv from "dotenv";
import router from './api/router';
import  DatabaseConnection from './datastore/db-connection';
import Logger from './api/helpers/logger'; // for logging


dotenv.config();
Logger.init();
const app = express();
// initialize database connection
DatabaseConnection();

// init router configs
router(app);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;