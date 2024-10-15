import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { IQueueService } from '../queue.interface';

@Injectable()
export class RabbitMqQueueService implements IQueueService {
  private connection;
  private channel;

  // Ensure the connection and channel are initialized
  private async ensureConnection() {
    if (!this.connection) {
      // Update the connection URL to point to the RabbitMQ container
      this.connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    }
    if (!this.channel) {
      this.channel = await this.connection.createChannel();
    }
  }

  // Publish a message to the RabbitMQ queue, creating it if necessary
  async publishMessage(queue: string, messageBody: string) {
    console.log('Publishing message to RabbitMQ queue');
    await this.ensureConnection();
    await this.channel.assertQueue(queue, { durable: true }); // Automatically creates the queue if missing
    this.channel.sendToQueue(queue, Buffer.from(messageBody));
  }

  // Subscribe and receive messages from the RabbitMQ queue
  async subscribe(queue: string) {
    await this.ensureConnection();
    await this.channel.assertQueue(queue, { durable: true }); // Ensure the queue exists
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        //console.log(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}
