import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Dependencies } from '@nestjs/common';
import { RmqExchange } from '@service/constants';
import { HistoryService } from './history.service';

@Controller()
@Dependencies(HistoryService)
export class HistoryCommand {
    constructor(historyService) {
        this.historyService = historyService;
    }

    @RabbitRPC({
        exchange: RmqExchange.history.name,
        routingKey: 'history.create-log.command',
        queue: 'history.create-log',
    })
    async createLog(@Body() dto) {
        await this.historyService.create(dto);
    }
}
