import { Injectable, Inject } from '@nestjs/common';
import { IQueueService } from './queue.interface';

@Injectable()
export class QueueService {
  constructor(
    @Inject('IQueueService') private readonly queueService: IQueueService
  ) {}

  async publishMessage(queueUrlOrName: string, message: string) {
    return this.queueService.publishMessage(queueUrlOrName, message);
  }

  async subscribe(queueUrlOrName: string) {
    return this.queueService.subscribe(queueUrlOrName);
  }
}
