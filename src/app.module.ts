import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './modules/queues/queue.module';
import { QueueService } from './modules/queues/queue.service';

@Module({
  imports: [ConfigModule.forRoot(), QueueModule.register()],
  controllers: [AppController],
  providers: [AppService, QueueService],
})
export class AppModule {}
