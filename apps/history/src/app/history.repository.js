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

    async find({userId: id, sort, limit, page}) {
        return this.prisma.history.findMany({
            where: {
                userId: id,
            },
            take: limit,
            orderBy: [
                {
                    createdAt: sort,
                },
            ],
            skip: page > 0 ? limit * (page - 1) : undefined,
        });
    }
}
