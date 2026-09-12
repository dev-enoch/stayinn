import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = req.headers.get("authorization")!;
    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized" },
        },
        { status: 401 },
      );
    }

    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        hotel: true,
        roomType: true,
        user: { select: { fullName: true, email: true, phone: true } },
        payment: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Booking not found" },
        },
        { status: 404 },
      );
    }

    // Access control
    if (
      booking.userId !== payload.userId &&
      booking.hotel.managerId !== payload.userId &&
      payload.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Not authorized to view this booking",
          },
        },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
        status: booking.status,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        numberOfGuests: booking.numberOfGuests,
        numberOfNights: booking.numberOfNights,
        totalAmount: booking.totalAmount / 100,
        qrData: booking.qrData,
        createdAt: booking.createdAt,
        hotel: {
          id: booking.hotel.id,
          name: booking.hotel.name,
          address: booking.hotel.address,
        },
        roomType: {
          id: booking.roomType.id,
          name: booking.roomType.name,
        },
        guest: booking.user,
        payment: booking.payment
          ? {
              status: booking.payment.status,
              gatewayReference: booking.payment.gatewayReference,
            }
          : null,
      },
    });
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
