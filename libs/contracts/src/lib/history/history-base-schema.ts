import {
  DEFAULT_QUERY_LIMIT,
  DEFAULT_QUERY_PAGE_NUMBER,
  DEFAULT_QUERY_SORT_DIRECTION,
  MAXIMUM_QUERY_LIMIT,
  QuerySortDirection,
  UsersActionStatus,
} from '@service/constants';
import { z } from 'nestjs-zod/z';

export const historyUserId = z.string().uuid({message: 'Invalid UUID'}).optional();
export const historyStatus = z.nativeEnum(UsersActionStatus);
export const historyChange = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  dateBirth: z.date().optional(),
  isAdmin: z.boolean().optional(),
}).strip();
export const historySortDirection = z.nativeEnum(QuerySortDirection).default(DEFAULT_QUERY_SORT_DIRECTION);
export const historyRecordsLimit = z.string().transform((val) => parseInt(val) || DEFAULT_QUERY_LIMIT).pipe(z.number().max(MAXIMUM_QUERY_LIMIT).catch(MAXIMUM_QUERY_LIMIT)).catch(DEFAULT_QUERY_LIMIT);
export const historyPageNumber = z.string().transform((val) => parseInt(val) || DEFAULT_QUERY_PAGE_NUMBER).catch(DEFAULT_QUERY_PAGE_NUMBER);
