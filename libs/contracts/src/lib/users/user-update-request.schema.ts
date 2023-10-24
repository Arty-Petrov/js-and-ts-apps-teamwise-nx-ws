import { z } from 'nestjs-zod/z';
import { userDateBirth, userEmail, userIsAdmin, userName } from './user-base-schema';

export const userUpdateRequestSchema = z.object({
  name: userName.optional(),
  email: userEmail.optional(),
  dateBirth: userDateBirth.optional(),
  isAdmin: userIsAdmin.optional(),
}).strip();

export type UserUpdateDto = z.infer<typeof userUpdateRequestSchema>;
