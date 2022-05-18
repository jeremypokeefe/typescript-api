import { NextFunction, Request, Response, Router } from 'express';
import { LogLevel } from '../enum/LogLevel';
import { Logger } from '../services/Logger';
import * as errorHandler from '../utils/errorHandler';

const logger = Logger.getInstance();

const handle404Error = (router: Router) => {
  router.use((err: Error) => {
    logger.log(LogLevel.Error, err.message, err.stack);
    errorHandler.notFoundError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.log(LogLevel.Error, err.message, err.stack);
    errorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.log(LogLevel.Error, err.message, err.stack);
    errorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
