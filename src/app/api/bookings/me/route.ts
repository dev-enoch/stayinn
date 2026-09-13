import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";
import { Booking } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")!;
    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== "BOOKER") {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "Booker access required" },
        },
        { status: 403 },
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: payload.userId },
      include: {
        hotel: { select: { id: true, name: true, coverImage: true, slug: true } },
        rooms: { include: { roomType: true } },
        payment: { select: { status: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const items = bookings.map(
      (
        b: Booking & {
          hotel: { id: string; name: string; coverImage: string | null; slug: string };
          rooms: Array<{ roomType: { id: string; name: string }; quantity: number }>;
          payment: { status: string } | null;
        },
      ) => ({
        id: b.id,
        hotel: {
          id: b.hotel.id,
          name: b.hotel.name,
          slug: b.hotel.slug,
          image: b.hotel.coverImage,
        },
        rooms: b.rooms.map((br) => ({
          id: br.roomType.id,
          name: br.roomType.name,
          quantity: br.quantity,
        })),
        checkInDate: b.checkInDate,
        checkOutDate: b.checkOutDate,
        totalAmount: b.totalAmount / 100,
        status: b.status,
        paymentStatus: b.payment?.status || null,
        qrData: b.qrData,
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
