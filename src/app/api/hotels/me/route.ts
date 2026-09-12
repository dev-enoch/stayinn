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

    if (!payload || payload.role !== "HOTEL_MANAGER") {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "Manager access required" },
        },
        { status: 403 },
      );
    }

    const hotel = await prisma.hotel.findFirst({
      where: { managerId: payload.userId },
      include: {
        roomTypes: true,
        bookings: {
          where: { status: { in: ["PAID", "CONFIRMED", "COMPLETED"] } },
          orderBy: { createdAt: "desc" },
          include: { roomType: true, user: true },
        },
      },
    });

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Hotel not found" },
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: hotel.id,
        name: hotel.name,
        status: hotel.status,
        totalEarnings:
          hotel.bookings.reduce((sum, b) => sum + b.totalAmount * 0.9, 0) / 100, // NGN
        pendingCheckins: hotel.bookings.filter((b) => b.status === "PAID")
          .length,
        bookingsCount: hotel.bookings.length,
        bookings: hotel.bookings.map((booking) => ({
          id: booking.id,
          guestName: booking.user.fullName,
          roomName: booking.roomType.name,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          status: booking.status,
          payoutAmount: (booking.totalAmount * 0.9) / 100, // NGN
        })),
      },
    });
  } catch (error: unknown) {
    console.error("Get Hotel Me Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
      },
      { status: 500 },
    );
  }
}
