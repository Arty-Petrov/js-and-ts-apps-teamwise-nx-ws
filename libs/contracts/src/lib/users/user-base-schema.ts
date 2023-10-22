import {
  DEFAULT_QUERY_LIMIT,
  DEFAULT_QUERY_PAGE_NUMBER,
  DEFAULT_QUERY_SORT_DIRECTION,
  MAXIMUM_QUERY_LIMIT,
  QuerySortDirection,
} from '@service/constants';
import { z } from 'nestjs-zod/z';

export const userId = z.string().uuid();
export const userName = z.string().min(3).max(15);
export const userEmail = z.string().email();
export const userDateBirth = z.coerce.date();
export const userIsAdmin = z.boolean().default(false);
export const userSortDirection = z.nativeEnum(QuerySortDirection).default(DEFAULT_QUERY_SORT_DIRECTION);
export const userRecordsLimit = z.string().transform((val) => parseInt(val) || DEFAULT_QUERY_LIMIT).pipe(z.number().max(MAXIMUM_QUERY_LIMIT).catch(MAXIMUM_QUERY_LIMIT)).catch(DEFAULT_QUERY_LIMIT);
export const userPageNumber = z.string().transform((val) => parseInt(val) || DEFAULT_QUERY_PAGE_NUMBER).catch(DEFAULT_QUERY_PAGE_NUMBER);
