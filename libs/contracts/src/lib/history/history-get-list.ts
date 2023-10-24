import { createZodDto } from 'nestjs-zod/dto';
import { historyGetListRequestSchema } from './history-get-list-request.schema';
import { historyGetListResponseSchema } from './history-get-list-response.schema';

export namespace HistoryGetList {

  export class Request extends createZodDto(historyGetListRequestSchema) {
  }

  export class Response extends createZodDto(historyGetListResponseSchema) {
  }
}

