
import * as winston from 'winston';
import express  from 'express';
import dotenv from 'dotenv';
import Router from './api/router';
import Logger from './api/helpers/logger'; // for logging
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import DatabaseConnection from './api/datastore/config';

// config();
Logger.init();
const app = express();
const router = new Router(app);
// initialize database connection
DatabaseConnection.initialize().catch((err) => winston.error("Error: Database Connection Error !", err));

console.log("AHMET db initialized")
// init router configs
router.initRouter();
console.log("AHMET router initialized")
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

export default server;