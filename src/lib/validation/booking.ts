import { z } from 'zod';

export const bookingSchema = z.object({
  hotelId: z.string().cuid(),
  roomTypeId: z.string().cuid(),
  checkInDate: z.string().date(),
  checkOutDate: z.string().date(),
  numberOfGuests: z.number().int().min(1)
});
