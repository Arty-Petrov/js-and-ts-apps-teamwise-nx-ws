import { Controller, Dependencies, Get, HttpStatus, Query, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { QuerySortDirection } from '@service/constants';
import { HistoryGetList, historyGetListRequestSchema } from '@service/contracts';
import { ZodValidationPipe } from 'nestjs-zod';
import { HistoryService } from './history.service';

@Controller('history')
@Dependencies(HistoryService)
export class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }

    @Get()
    @ApiOperation({description: 'Get history list with filter by user id '})
    @ApiQuery({
        name: 'userId',
        allowEmptyValue: true,
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        enum: QuerySortDirection,
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        allowEmptyValue: true,
        required: false,
    })
    @ApiQuery({
        name: 'page',
        allowEmptyValue: true,
        required: false,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: HistoryGetList.Response,
        isArray: true,
    })
    @UsePipes(new ZodValidationPipe(historyGetListRequestSchema))
    async getHistoryList(@Query() query) {
        return this.historyService.getList(query);
    }
}
