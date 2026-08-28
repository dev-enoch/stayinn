import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { verifyQRSignature } from '@/lib/qr';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload) {
      return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } }, { status: 401 });
    }

    if (payload.role !== 'HOTEL_MANAGER' && payload.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, { status: 403 });
    }

    const { id: bookingId } = await params;
    const body = await req.json();
    const { qrData, qrSignature } = body;

    if (!qrData || !qrSignature) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'QR data and signature required' } }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hotel: true }
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Booking not found' } }, { status: 404 });
    }

    // Verify manager owns this hotel (skip for admin)
    if (payload.role === 'HOTEL_MANAGER' && booking.hotel.managerId !== payload.userId) {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized for this hotel' } }, { status: 403 });
    }

    // Verify booking state
    if (booking.status !== 'PAID') {
      return NextResponse.json({ success: false, error: { code: 'INVALID_STATE', message: 'Booking is not in PAID state' } }, { status: 400 });
    }

    // Verify QR Signature
    const isValidSignature = verifyQRSignature(qrData, qrSignature);
    if (!isValidSignature) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_SIGNATURE', message: 'QR signature is invalid or forged' } }, { status: 400 });
    }

    // Parse the QR data to verify booking ID matches just in case
    const qrPayload = JSON.parse(qrData);
    if (qrPayload.bookingId !== bookingId) {
      return NextResponse.json({ success: false, error: { code: 'MISMATCH', message: 'QR code does not match this booking' } }, { status: 400 });
    }

    // Check dates (simplified for MVP: check-in is today or past, but not after check-out)
    const now = new Date();
    if (now > booking.checkOutDate) {
      return NextResponse.json({ success: false, error: { code: 'EXPIRED', message: 'Check-out date has passed' } }, { status: 400 });
    }

    // Process confirmation in transaction
    await prisma.$transaction(async (tx: any) => {
      const db = tx as typeof prisma;

      await db.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date()
        }
      });

      // Create payout record for the hotel
      await db.payout.create({
        data: {
          hotelId: booking.hotelId,
          bookingId: booking.id,
          amount: booking.hotelPayout,
          status: 'PENDING'
        }
      });
    });

    return NextResponse.json({ success: true, message: 'Booking confirmed successfully' });

  } catch (error: unknown) {
    console.error('Booking Confirm Error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
