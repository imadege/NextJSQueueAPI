import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { QueueService } from './modules/queues/queue.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly queueService: QueueService
  ) {}
  
  @Post()
  async publishMessage(
    @Body() body: { queueName: string; message: string },
  ): Promise<{ message: string }> {
    const { queueName, message } = body;
    await this.queueService.publishMessage(queueName, message);
    return { message: `Message published to ${queueName}` };
  }

  // Endpoint for subscribing to a queue and receiving messages
  @Get('subscribe')
  async subscribeToQueue(@Query('queueName') queueName: string): Promise<any> {
    const messages = await this.queueService.subscribe(queueName);
    return { messages };
  }
}
