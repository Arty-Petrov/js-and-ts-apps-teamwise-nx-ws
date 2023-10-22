import { z } from 'nestjs-zod/z';

export const userId = z.string().uuid();
export const userName = z.string().min(3).max(15);
export const userEmail = z.string().email();
export const userDateBirth = z.dateString().format('date').cast();//coerce.date();
export const userIsAdmin = z.boolean().default(false);
