export interface IQueueService {
  publishMessage(queueUrlOrName: string, messageBody: string): Promise<void>;
  subscribe(queueUrlOrName: string): Promise<any>;
}
