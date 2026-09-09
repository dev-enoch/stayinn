import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/profile/", "/bookings/", "/book/"],
      },
    ],
    sitemap: "https://stayinn.ng/sitemap.xml",
  };
}
