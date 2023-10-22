import { z } from 'nestjs-zod/z';
import { userPageNumber, userRecordsLimit, userSortDirection } from './user-base-schema';

export const userGetListRequestSchema = z.object({
  sort: userSortDirection,
  limit: userRecordsLimit,
  page: userPageNumber,
}).strip();

export type UserGetListDto = z.infer<typeof userGetListRequestSchema>;

