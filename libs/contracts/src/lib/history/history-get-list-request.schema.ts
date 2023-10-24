import { z } from 'zod';
import { historyPageNumber, historyRecordsLimit, historySortDirection, historyUserId } from './history-base-schema';

export const historyGetListRequestSchema = z
  .object({
    userId: historyUserId.optional(),
    sort: historySortDirection,
    limit: historyRecordsLimit,
    page: historyPageNumber,
  });

export type HistoryGetListDto = z.infer<typeof historyGetListRequestSchema>;
