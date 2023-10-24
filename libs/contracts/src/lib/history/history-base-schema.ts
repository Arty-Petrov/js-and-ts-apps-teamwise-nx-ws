import { UsersActionStatus } from '@service/constants';
import { z } from 'nestjs-zod/z';

export const historyUserId = z.string().uuid({message: 'Invalid UUID'}).optional();
export const historyStatus = z.nativeEnum(UsersActionStatus);
export const historyChange = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  dateBirth: z.date().optional(),
  isAdmin: z.boolean().optional(),
}).strip();
