"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { initializeTransaction } from "@/lib/paystack";
import { v4 as uuidv4 } from "uuid";

export async function createBookingAndPay(data: {
  roomId: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
}) {
  const session = await getSession();
  if (!session) return { error: "You must be logged in to book" };

  try {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return { error: "User not found" };

    const room = await prisma.roomType.findUnique({ where: { id: data.roomId } });
    if (!room) return { error: "Room not found" };

    // Availability Check (FR-BOOK-005)
    // Count existing bookings that overlap and are PENDING, PAID, or CONFIRMED
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    const numberOfNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const commissionRate = 0.10;
    const commissionAmount = Math.round(data.total * commissionRate);
    const hotelPayout = data.total - commissionAmount;

    const overlappingBookings = await prisma.booking.count({
      where: {
        roomTypeId: data.roomId,
        status: { in: ["PENDING", "PAID", "CONFIRMED"] },
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } }
        ]
      }
    });

    if (overlappingBookings >= room.quantity) {
      return { error: "This room is fully booked for the selected dates." };
    }

    // Create Booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.userId,
        hotelId: data.hotelId,
        roomTypeId: data.roomId,
        checkInDate,
        checkOutDate,
        numberOfNights,
        numberOfGuests: data.guests,
        totalAmount: data.total,
        commissionRate,
        commissionAmount,
        hotelPayout,
        status: "PENDING"
      }
    });

    // Initialize Paystack
    const reference = `STAYINN_${uuidv4()}`;
    const paystackRes = await initializeTransaction(
      user.email,
      data.total * 100, // convert NGN to kobo
      reference,
      { bookingId: booking.id }
    );

    // Upsert Payment Record
    await prisma.payment.upsert({
      where: { bookingId: booking.id },
      create: {
        bookingId: booking.id,
        userId: session.userId,
        amount: data.total,
        gatewayReference: reference,
        status: "INITIATED"
      },
      update: {
        gatewayReference: reference,
        status: "INITIATED"
      }
    });

    return { success: true, authorizationUrl: paystackRes.data.authorization_url };

  } catch (error) {
    console.error("Booking Error:", error);
    return { error: "Failed to process booking" };
  }
}
