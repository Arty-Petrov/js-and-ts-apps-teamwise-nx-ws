import { Module } from '@nestjs/common';
import { HistoryPrismaClientService } from './history-prisma-client.service';

@Module({
  providers: [HistoryPrismaClientService],
  exports: [HistoryPrismaClientService],
})
export class HistoryPrismaClientModule {}
