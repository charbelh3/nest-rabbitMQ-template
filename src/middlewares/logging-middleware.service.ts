import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomWinstonLogger } from '../helpers/logger.service';

@Injectable()
export class LoggingMiddlewareService implements NestMiddleware {
  constructor(private logger: CustomWinstonLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path: url } = req;
    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      if (statusCode === 201 || statusCode === 200) {
        this.logger.log(
          `${method} ${url} ${statusCode} - ${resTime - reqTime} ms`,
        );
      }
    });
    next();
  }
}
