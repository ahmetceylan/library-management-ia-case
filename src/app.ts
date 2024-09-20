

import dotenv from 'dotenv';

import * as winston from 'winston';
import express  from 'express';
import Router from './api/router';
import Logger from './api/helpers/logger'; // for logging
import path from 'path';
import DatabaseConnection from './api/datastore/config';
dotenv.config({ path: path.join(__dirname , './../.env') });
DatabaseConnection.getInstance().initialize().catch((err) => winston.error("Error: Database Connection Error !", err));

Logger.init();
const app = express();
const router = new Router(app);
// initialize database connection


console.log("AHMET db initialized")
// init router configs
router.initRouter();
console.log("AHMET router initialized")
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

export default server;