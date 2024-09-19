import winston from 'winston';

export default class Logger {
  logger;
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [   
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
      ]
    });
  }

  init () {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
    // enable below line to write into a file
    winston.add(this.logger);
  }
}