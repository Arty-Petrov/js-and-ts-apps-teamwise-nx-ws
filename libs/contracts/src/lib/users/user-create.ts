import { createZodDto } from 'nestjs-zod/dto';
import { userCreateRequestSchema } from './user-create-request.schema';
import { userCreateResponseSchema } from './user-create-response.schema';

export namespace UserCreate {

  export class Request extends createZodDto(userCreateRequestSchema) {
  }

  export class Response extends createZodDto(userCreateResponseSchema) {
  }
}
