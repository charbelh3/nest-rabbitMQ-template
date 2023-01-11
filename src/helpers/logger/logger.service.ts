import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import * as winston from 'winston';
import * as correlation from 'express-correlation-id';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;
  private logTransform = (info: winston.Logform.TransformableInfo): string => {
    const { level, message, timestamp, correlationId } = info;
    return `${timestamp} -${correlationId}- ${level}: ${message}`;
  };

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      level:
        this.configService.get<string>('NODE_ENV') === 'environment'
          ? 'debug'
          : 'info',
      format: winston.format.combine(
        winston.format((info) => {
          info.correlationId = correlation.getId();
          return info;
        })(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf(this.logTransform),
      ),
      transports: [new winston.transports.Console()],
      exitOnError: false,
    });
  }

  log(message: any) {
    this.logger.info(message);
  }
  warn(message: any) {
    this.logger.warn(message);
  }
  error(message: any) {
    this.logger.error(message);
  }
  debug(message: any) {
    this.logger.debug(message);
  }
  verbose(message: any) {
    this.logger.verbose(message);
  }
}
