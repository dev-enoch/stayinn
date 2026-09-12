import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";
import { Booking } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ hotelId: string }> },
) {
  try {
    const authHeader = req.headers.get("authorization")!;
    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);

    if (
      !payload ||
      (payload.role !== "HOTEL_MANAGER" && payload.role !== "ADMIN")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "Manager access required" },
        },
        { status: 403 },
      );
    }

    const { hotelId } = await params;
    const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });

    if (
      !hotel ||
      (hotel.managerId !== payload.userId && payload.role !== "ADMIN")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "Not authorized" },
        },
        { status: 403 },
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { hotelId },
      include: {
        roomType: { select: { name: true } },
        user: { select: { fullName: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const items = bookings.map(
      (
        b: Booking & { roomType: { name: string }; user: { fullName: string } },
      ) => ({
        id: b.id,
        guestName: b.user.fullName,
        roomTypeName: b.roomType.name,
        checkInDate: b.checkInDate,
        checkOutDate: b.checkOutDate,
        hotelPayout: b.hotelPayout / 100,
        status: b.status,
      }),
    );

    return NextResponse.json({ success: true, data: { items } });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
      },
      { status: 500 },
    );
  }
}
