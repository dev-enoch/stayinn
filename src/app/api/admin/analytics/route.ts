import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized" },
        },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "Admin access required" },
        },
        { status: 403 },
      );
    }

    const [totalUsers, totalHotels, totalBookings, revenueResult, hotelsList] =
      await Promise.all([
        prisma.user.count(),
        prisma.hotel.count(),
        prisma.booking.count(),
        prisma.booking.aggregate({
          _sum: {
            commissionAmount: true,
          },
          where: {
            status: { in: ["PAID", "CONFIRMED", "COMPLETED"] },
          },
        }),
        prisma.hotel.findMany({
          orderBy: { createdAt: "desc" },
          include: { manager: { select: { fullName: true } } },
        }),
      ]);

    const totalRevenue = revenueResult._sum.commissionAmount || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalHotels,
        totalBookings,
        totalRevenue: totalRevenue / 100, // Convert from kobo to NGN
        hotels: hotelsList,
      },
    });
  } catch (error: unknown) {
    console.error("Admin Analytics Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
      },
      { status: 500 },
    );
  }
}
