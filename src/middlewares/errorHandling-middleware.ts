import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomWinstonLogger } from 'src/helpers/logger.service';

@Catch(HttpException)
//Intercept errors and log them
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: CustomWinstonLogger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      `${request.method} ${request.url} ${status} error: ${exception.message}`,
    );
    response.status(status).json(exception.getResponse());
  }
}
