import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://stayinn.ng";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/cities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/host`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/support`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/support/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic hotel routes
  let hotelRoutes: MetadataRoute.Sitemap = [];
  try {
    const hotels = await prisma.hotel.findMany({
      where: { status: "APPROVED" },
      select: { slug: true, updatedAt: true },
    });

    hotelRoutes = hotels.flatMap((hotel) => [
      {
        url: `${base}/hotels/${hotel.slug}`,
        lastModified: hotel.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
    ]);

    // Room pages
    const rooms = await prisma.roomType.findMany({
      where: { status: "ACTIVE", hotel: { status: "APPROVED" } },
      select: { id: true, hotel: { select: { slug: true } }, updatedAt: true },
    });

    const roomRoutes: MetadataRoute.Sitemap = rooms.map((room) => ({
      url: `${base}/hotels/${room.hotel.slug}/rooms/${room.id}`,
      lastModified: room.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    hotelRoutes = [...hotelRoutes, ...roomRoutes];
  } catch {
    // DB unavailable at build time — return static routes only
  }

  return [...staticRoutes, ...hotelRoutes];
}
