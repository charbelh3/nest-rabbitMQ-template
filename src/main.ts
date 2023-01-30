import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomWinstonLogger } from './helpers/logger.service';
import * as correlationId from 'express-correlation-id';
import { HttpExceptionFilter } from './middlewares/errorHandling-middleware';
import { ConfigService } from '@nestjs/config';
import RabbitMQClient from './rabbitmq/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerInstance = app.get(CustomWinstonLogger);
  const config = app.get(ConfigService);

  app.useLogger(loggerInstance);
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  app.use(correlationId());

  //Connect to rabbitMQ to produce/consume messages
  const rabbitClient = app.get(RabbitMQClient);
  await rabbitClient.initialize();

  process.on('SIGINT', async () => {
    await rabbitClient.closeConnection();
    process.exit(1);
  });

  await app.listen(config.get('server.port'));
}
bootstrap();
