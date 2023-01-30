import { Module, Global } from '@nestjs/common';
import { CustomWinstonLogger } from './helpers/logger.service';
import RabbitMQClient from './rabbitmq/client';

@Global()
@Module({
  providers: [RabbitMQClient, CustomWinstonLogger],
  exports: [RabbitMQClient, CustomWinstonLogger],
})
export class GlobalModule {}
