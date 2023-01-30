import { Channel } from 'amqplib';
import { EventEmitter } from 'events';

export default class Consumer {
  constructor(
    private channel: Channel,
    private eventEmitter: EventEmitter,
    private requestQueueName: string,
    private replyQueue: string,
  ) {}

  async consumeMessages() {
    //Consume the reply message that arrives on the reply queue
    this.channel.consume(
      this.replyQueue,
      (message) => {
        this.eventEmitter.emit(
          message.properties.correlationId.toString(),
          message,
        );
      },
      {
        noAck: true,
      },
    );

    //Consume the messages that arrives on the request queue
    this.channel.consume(
      this.requestQueueName,
      (message) => {
        //TODO: Create switch case to perform different functions
      },
      {
        noAck: true,
      },
    );
  }
}
