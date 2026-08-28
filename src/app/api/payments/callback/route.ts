import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyTransaction } from '@/lib/paystack';
import { generateBookingQR } from '@/lib/qr';
import { emailQueue } from '@/lib/queue/emailQueue';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.redirect(new URL('/?error=missing_reference', req.url));
    }

    // 1. Verify transaction with Paystack
    const verifyRes = await verifyTransaction(reference);

    const payment = await prisma.payment.findUnique({
      where: { gatewayReference: reference },
      include: {
        booking: {
          include: {
            user: true,
            hotel: true,
            roomType: true,
          }
        }
      }
    });

    if (!payment) {
      return NextResponse.redirect(new URL('/?error=payment_not_found', req.url));
    }

    const { booking } = payment;

    if (verifyRes.data.status === 'success') {
      // If already processed, just redirect
      if (payment.status === 'SUCCESS' && booking.status === 'PAID') {
        return NextResponse.redirect(new URL(`/bookings/${booking.id}?status=success`, req.url));
      }

      // 2. Process confirmation in a transaction
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: 'SUCCESS' }
        });

        await tx.booking.update({
          where: { id: booking.id },
          data: { status: 'PAID' }
        });
      });

      // 3. Generate QR code payload and signature
      const qrPayload = {
        bookingId: booking.id,
        hotelId: booking.hotelId,
        roomTypeId: booking.roomTypeId,
        guestName: booking.user.fullName,
        checkInDate: booking.checkInDate.toISOString(),
        checkOutDate: booking.checkOutDate.toISOString(),
        numberOfGuests: booking.numberOfGuests,
      };

      const qrResult = await generateBookingQR(qrPayload);

      // Save the generated QR data to the booking
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          qrData: qrResult.qrData,
          qrSignature: qrResult.qrSignature,
        }
      });

      // 4. Queue the confirmation email
      await emailQueue.add('send-booking-confirmation', {
        bookingId: booking.id,
        guestName: booking.user.fullName,
        guestEmail: booking.user.email,
        hotelName: booking.hotel.name,
        roomTypeName: booking.roomType.name,
        checkInDate: booking.checkInDate.toISOString().split('T')[0],
        checkOutDate: booking.checkOutDate.toISOString().split('T')[0],
        qrImageBase64: qrResult.qrImageBase64,
      });

      return NextResponse.redirect(new URL(`/bookings/${booking.id}?status=success`, req.url));
    } else {
      // Payment failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' }
      });
      return NextResponse.redirect(new URL(`/bookings/${booking.id}?status=failed`, req.url));
    }

  } catch (error) {
    console.error('Payment Callback Error:', error);
    return NextResponse.redirect(new URL('/?error=internal_error', req.url));
  }
}
