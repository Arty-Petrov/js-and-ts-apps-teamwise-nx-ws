import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/client/history';

@Injectable()
export class HistoryPrismaClientService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
