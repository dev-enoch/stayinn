import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+234\d{10}$/, 'Phone must start with +234 and be 14 characters long'),
  password: z.string().min(8),
  role: z.enum(['BOOKER', 'HOTEL_MANAGER'])
});

export const loginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1)
});
