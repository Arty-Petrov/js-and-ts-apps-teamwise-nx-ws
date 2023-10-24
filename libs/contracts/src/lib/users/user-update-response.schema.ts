import { z } from 'nestjs-zod/z';

export const userUpdateResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  dateBirth: z.date(),
  isAdmin: z.boolean(),
}).strip();

export type UserUpdateRdo = z.infer<typeof userUpdateResponseSchema>;
