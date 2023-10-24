import { createZodDto } from 'nestjs-zod/dto';
import { userUpdateRequestSchema } from './user-update-request.schema';
import { userUpdateResponseSchema } from './user-update-response.schema';

export namespace UserUpdate {

  export class Request extends createZodDto(userUpdateRequestSchema) {
  }

  export class Response extends createZodDto(userUpdateResponseSchema) {
  }
}
