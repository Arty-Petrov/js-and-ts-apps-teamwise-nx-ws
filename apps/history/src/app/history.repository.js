import { Dependencies, Injectable } from '@nestjs/common';
import { HistoryPrismaClientService } from '@service/history-prisma-client';

@Injectable()
@Dependencies(HistoryPrismaClientService)
export class HistoryRepository {
    constructor(historyPrismaClientService) {
        this.prisma = historyPrismaClientService;
    }

    async create(entity) {
        await this.prisma.history.create({
            data: {...entity.toObject()},
        });
    }
}
