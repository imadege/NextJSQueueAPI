import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  GetQueueUrlCommand,
  CreateQueueCommand,
} from '@aws-sdk/client-sqs';
import { IQueueService } from '../queue.interface';

@Injectable()
export class SqsQueueService implements IQueueService {
  private readonly sqsClient = new SQSClient({
    region: 'us-east-1',
    endpoint: 'http://localstack:4566', // LocalStack endpoint
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
  });

  // Method to retrieve the queue URL from the queue name
  private async getQueueUrl(queueName: string): Promise<string> {
    try {
      const params = {
        QueueName: queueName,
      };
      const command = new GetQueueUrlCommand(params);
      const result = await this.sqsClient.send(command);
      return result.QueueUrl;
    } catch (error) {
      if (error.name === 'QueueDoesNotExist') {
        // Queue does not exist, create it
        const createParams = {
          QueueName: queueName,
        };
        const createCommand = new CreateQueueCommand(createParams);
        const createResult = await this.sqsClient.send(createCommand);
        return createResult.QueueUrl;
      } else {
        throw error;
      }
    }
  }

  async publishMessage(queueName: string, messageBody: string) {
    console.log('Publishing message to SQS queue');
    const queueUrl = await this.getQueueUrl(queueName);
    const params = {
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    };
    const command = new SendMessageCommand(params);
    await this.sqsClient.send(command);
  }

  async subscribe(queueName: string) {
    const queueUrl = await this.getQueueUrl(queueName);
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    };
    const command = new ReceiveMessageCommand(params);
    const data = await this.sqsClient.send(command);
    return data.Messages || [];
  }
}
