import { z } from 'zod';
import { historyChange, historyStatus, historyUserId } from './history-base-schema';

export const historyGetListResponseSchema = z
  .object({
    userId: historyUserId,
    status: historyStatus,
    change: historyChange,
  }).strip();

export type HistoryGetListRdo = z.infer<typeof historyGetListResponseSchema>;
