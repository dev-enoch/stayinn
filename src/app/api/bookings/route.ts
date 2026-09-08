import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validation/booking';
import { verifyAccessToken } from '@/lib/auth';
import { initializeTransaction } from '@/lib/paystack';
import { v4 as uuidv4 } from "uuid";
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'BOOKER') {
       return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Booker access required' } }, { status: 403 });
    }

    const body = await req.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: result.error.issues[0].message } }, { status: 422 });
    }

    const { hotelId, roomTypeId, checkInDate, checkOutDate, numberOfGuests } = result.data;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn >= checkOut) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Check-out must be after check-in' } }, { status: 400 });
    }

    const numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));

    return await prisma.$transaction(async (tx) => {
      const db = tx as typeof prisma;
      const roomType = await db.roomType.findUnique({ where: { id: roomTypeId } });
      if (!roomType || roomType.hotelId !== hotelId) {
        throw new Error('NOT_FOUND');
      }

      if (numberOfGuests > roomType.capacity) {
         throw new Error('CAPACITY_EXCEEDED');
      }

      // Check availability (Overlapping bookings count)
      const overlappingBookings = await db.booking.count({
        where: {
          roomTypeId,
          status: { in: ['PENDING', 'PAID', 'CONFIRMED'] },
          AND: [
            { checkInDate: { lt: checkOut } },
            { checkOutDate: { gt: checkIn } }
          ]
        }
      });

      if (overlappingBookings >= roomType.quantity) {
        throw new Error('BOOKING_NOT_AVAILABLE');
      }

      // Calculate total amount (in kobo)
      const totalAmount = numberOfNights * roomType.pricePerNight;

      // Get commission setting
      const commissionSetting = await db.commissionSetting.findFirst();
      const commissionRate = commissionSetting ? Number(commissionSetting.rate) : 0.1;
      const commissionAmount = Math.floor(totalAmount * commissionRate);
      const hotelPayout = totalAmount - commissionAmount;

      // Create the booking
      const booking = await db.booking.create({
        data: {
          userId: payload.userId,
          hotelId,
          roomTypeId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          numberOfGuests,
          numberOfNights,
          totalAmount,
          commissionRate,
          commissionAmount,
          hotelPayout,
          status: 'PENDING'
        }
      });

      // Initialize Paystack
      const user = await db.user.findUnique({ where: { id: payload.userId } });
      const reference = `STAYINN_${uuidv4()}`;
      const paystackRes = await initializeTransaction(
        user!.email,
        totalAmount, // already in kobo
        reference,
        { bookingId: booking.id }
      );

      // Upsert Payment Record
      await db.payment.upsert({
        where: { bookingId: booking.id },
        create: {
          bookingId: booking.id,
          userId: payload.userId,
          amount: totalAmount,
          gatewayReference: reference,
          status: "INITIATED"
        },
        update: {
          gatewayReference: reference,
          status: "INITIATED"
        }
      });

      return NextResponse.json({
        success: true,
        data: {
          id: booking.id,
          totalAmount: booking.totalAmount / 100,
          status: booking.status,
          authorizationUrl: paystackRes.data.authorization_url
        },
        message: 'Booking created'
      }, { status: 201 });
    });
  } catch (err: unknown) {
    const error = err as Error;
    if (error.message === 'NOT_FOUND') return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Room type not found' } }, { status: 404 });
    if (error.message === 'CAPACITY_EXCEEDED') return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Number of guests exceeds room capacity' } }, { status: 400 });
    if (error.message === 'BOOKING_NOT_AVAILABLE') return NextResponse.json({ success: false, error: { code: 'BOOKING_NOT_AVAILABLE', message: 'Room is not available for these dates' } }, { status: 409 });
    
    console.error('Create Booking Error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
