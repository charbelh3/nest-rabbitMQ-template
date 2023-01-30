import { EventEmitter } from 'stream';
import Consumer from './consumer';
import Producer from './producer';
import { Connection, connect, Channel } from 'amqplib';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomWinstonLogger } from 'src/helpers/logger.service';

@Injectable()
export default class RabbitMQClient {
  constructor(
    private config: ConfigService,
    private logger: CustomWinstonLogger,
  ) {}
  private eventEmitter: EventEmitter = new EventEmitter();

  private producer: Producer;
  private consumer: Consumer;

  private connection: Connection;
  private producerChannel: Channel;
  private consumerChannel: Channel;

  async initialize() {
    try {
      //Connect to rabbitMQ
      this.connection = await connect(this.config.get('rabbitMQ.host'));
      //Create producer and consumer channels
      await this.createChannels();

      //Create reply queue (unique for every pod)
      const { queue: replyQueueName } = await this.consumerChannel.assertQueue(
        '',
        {
          autoDelete: true,
        },
      );
      const { queue: requestQueueName } =
        await this.consumerChannel.assertQueue(
          this.config.get('rabbitMQ.queues.paymentsRequestQueue'),
          {
            durable: true,
          },
        );

      //Create the producer and consumer
      this.producer = new Producer(
        this.producerChannel,
        this.eventEmitter,
        replyQueueName,
        this.config,
      );

      this.consumer = new Consumer(
        this.consumerChannel,
        this.eventEmitter,
        requestQueueName,
        replyQueueName,
      );

      //Run consumers
      this.consumer.consumeMessages();
    } catch (error) {
      this.logger.error(`RabbitMQ error:  ${error}`);
    }
  }

  async createChannels() {
    this.producerChannel = await this.connection.createChannel();
    this.consumerChannel = await this.connection.createChannel();
  }

  async produce(
    data,
    queueName: string,
    correlationId: string,
    waitForResponse: boolean,
    needToAssertQueue = false,
  ) {
    if (!this.connection || !this.producerChannel) {
      await this.initialize();
    }

    return this.producer.publishMessage(
      data,
      queueName,
      correlationId,
      waitForResponse,
      needToAssertQueue,
    );
  }

  async closeConnection() {
    try {
      this.connection.close();
    } catch (error) {
      this.logger.error(`RabbitMQ error:  ${error}`);
    }
  }
}
