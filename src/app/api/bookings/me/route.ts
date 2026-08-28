import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { Booking } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'BOOKER') {
       return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Booker access required' } }, { status: 403 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: payload.userId },
      include: {
        hotel: { select: { name: true, coverImage: true, address: true } },
        roomType: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const items = bookings.map((b: Booking & { hotel: { name: string, coverImage: string | null, address: string }, roomType: { name: string } }) => ({
      id: b.id,
      hotelName: b.hotel.name,
      roomTypeName: b.roomType.name,
      checkInDate: b.checkInDate,
      checkOutDate: b.checkOutDate,
      totalAmount: b.totalAmount / 100,
      status: b.status,
      qrData: b.qrData
    }));

    return NextResponse.json({ success: true, data: { items } });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
