import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { initializeTransaction } from '@/lib/paystack';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload) {
      return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } }, { status: 401 });
    }

    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'bookingId is required' } }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true }
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Booking not found' } }, { status: 404 });
    }

    if (booking.userId !== payload.userId) {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, { status: 403 });
    }

    if (booking.status !== 'PENDING') {
      return NextResponse.json({ success: false, error: { code: 'INVALID_STATE', message: 'Booking is not pending' } }, { status: 400 });
    }

    // Generate unique reference
    const reference = `STAYINN_${uuidv4()}`;

    // Initialize Paystack transaction
    const paystackRes = await initializeTransaction(
      booking.user.email,
      booking.totalAmount,
      reference,
      { bookingId }
    );

    // Upsert payment record
    await prisma.payment.upsert({
      where: { bookingId },
      create: {
        bookingId,
        userId: booking.userId,
        amount: booking.totalAmount,
        gatewayReference: reference,
        status: 'INITIATED',
      },
      update: {
        gatewayReference: reference,
        status: 'INITIATED',
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        authorizationUrl: paystackRes.data.authorization_url,
        reference: paystackRes.data.reference
      }
    });

  } catch (error: unknown) {
    console.error('Payment Initiate Error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to initiate payment' } }, { status: 500 });
  }
}
