import { createZodDto } from 'nestjs-zod/dto';
import { historyCreateLogRequestSchema } from './history-create-log-request.schema';

export namespace HistoryCreateLog {

  export class Request extends createZodDto(historyCreateLogRequestSchema) {
  }

  export class Response {
  }
}
