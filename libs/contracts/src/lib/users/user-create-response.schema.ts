import { z } from 'nestjs-zod/z';

export const userCreateResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  dateBirth: z.date(),
  isAdmin: z.boolean(),
}).strip();

export type UserCreateRdo = z.infer<typeof userCreateResponseSchema>;

