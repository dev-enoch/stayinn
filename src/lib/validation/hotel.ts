import { z } from "zod";

export const hotelSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  address: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  coverImage: z.string().url(),
  amenities: z
    .array(
      z.enum([
        "WIFI",
        "WATER",
        "BACKUP_POWER",
        "PARKING",
        "POOL",
        "GYM",
        "RESTAURANT",
        "AIR_CONDITIONING",
      ]),
    )
    .optional(),
});

export const roomTypeSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(300).optional(),
  pricePerNight: z.number().int().min(1000).max(10000000), // in NGN
  capacity: z.number().int().min(1).max(20),
  quantity: z.number().int().min(1).max(100),
  images: z.array(z.string().url()).min(1).max(8),
});
