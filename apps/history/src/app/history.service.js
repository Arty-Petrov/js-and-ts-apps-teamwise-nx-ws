import { Dependencies, Injectable } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import HistoryEntity from './history.entity';

@Injectable()
@Dependencies(HistoryRepository)
export class HistoryService {
  constructor(historyRepository) {
    this.historyRepository= historyRepository;
  }
  async create(dto) {
    const historyEntity = new HistoryEntity(dto);
    await this.historyRepository.create(historyEntity);
  }
}
