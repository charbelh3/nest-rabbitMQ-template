import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WinstonLogger } from '../logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingMiddlewareService implements NestMiddleware {
  private logger: WinstonLogger;
  constructor(private configService: ConfigService) {
    this.logger = new WinstonLogger(this.configService);
  }
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path: url } = req;
    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      this.logger.log(
        `${method} ${url} ${statusCode} - ${resTime - reqTime} ms`,
      );
    });
    next();
  }
}
