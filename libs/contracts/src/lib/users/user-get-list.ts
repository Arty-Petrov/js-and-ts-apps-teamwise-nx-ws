import { createZodDto } from 'nestjs-zod/dto';
import { userGetListRequestSchema } from './user-get-list-request.schema';
import { userGetListResponseSchema } from './user-get-list-response.schema';

export namespace UserGetList {

  export class Request extends createZodDto(userGetListRequestSchema) {
  }

  export class Response extends createZodDto(userGetListResponseSchema) {
  }
}
