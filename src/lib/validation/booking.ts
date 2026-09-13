import { z } from "zod";

export const bookingSchema = z.object({
  hotelId: z.string().cuid(),
  rooms: z.array(z.object({
    roomTypeId: z.string().cuid(),
    quantity: z.number().int().min(1),
  })).min(1),
  checkInDate: z.string().date(),
  checkOutDate: z.string().date(),
  numberOfGuests: z.number().int().min(1),
});
