import { z } from 'nestjs-zod/z';

export const userGetListResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  dateBirth: z.date(),
  isAdmin: z.boolean(),
}).strip();

export type UserGetListRdo = z.infer<typeof userGetListResponseSchema>;

