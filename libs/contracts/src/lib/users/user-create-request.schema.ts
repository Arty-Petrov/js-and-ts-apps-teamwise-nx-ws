import { z } from 'nestjs-zod/z';
import { userDateBirth, userEmail, userIsAdmin, userName } from './user-base-schema';

export const userCreateRequestSchema = z.object({
  name: userName,
  email: userEmail,
  dateBirth: userDateBirth,
  isAdmin: userIsAdmin,
}).strip();

export type UserCreateDto = z.infer<typeof userCreateRequestSchema>;
