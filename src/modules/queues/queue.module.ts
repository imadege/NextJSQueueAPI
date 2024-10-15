import { Module, DynamicModule } from '@nestjs/common';
import { SqsQueueService } from './services/sqs-queue.service';
import { RabbitMqQueueService } from './services/rabbitmq-queue.service';

@Module({})
export class QueueModule {
  static register(): DynamicModule {
    const queueProvider = process.env.QUEUE_PROVIDER || 'SQS';
    const providers = [];
    if (queueProvider === 'SQS') {
      providers.push({
        provide: 'IQueueService',
        useClass: SqsQueueService,
      });
    } else if (queueProvider === 'RABBITMQ') {
      providers.push({
        provide: 'IQueueService',
        useClass: RabbitMqQueueService,
      });
    }

    return {
      module: QueueModule,
      providers: providers,
      exports: providers,
    };
  }
}
