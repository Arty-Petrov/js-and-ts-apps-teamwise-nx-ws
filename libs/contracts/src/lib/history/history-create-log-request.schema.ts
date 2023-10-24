import { z } from 'zod';
import { historyChange, historyStatus, historyUserId } from './history-base-schema';

export const historyCreateLogRequestSchema = z
  .object({
    userId: historyUserId,
    status: historyStatus,
    change: historyChange,
  }).required();

export type HistoryCreateLogDto = z.infer<typeof historyCreateLogRequestSchema>;
