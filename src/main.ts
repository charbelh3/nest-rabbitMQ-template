import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './helpers/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import * as correlationId from 'express-correlation-id';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new WinstonLogger(app.get(ConfigService)));
  app.use(correlationId());
  await app.listen(3000);
}
bootstrap();
