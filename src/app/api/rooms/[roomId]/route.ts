import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RoomType, RoomImage, Hotel } from '@prisma/client';

export async function GET(req: Request, { params }: { params: Promise<{ roomId: string }> }) {
  try {
    const { roomId } = await params;
    const room = await prisma.roomType.findUnique({
      where: { id: roomId, status: 'ACTIVE' },
      include: {
        hotel: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (!room || room.hotel.status !== 'APPROVED') {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Room not found or hotel not approved' } }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: room.id,
        name: room.name,
        description: room.description,
        pricePerNight: room.pricePerNight / 100, // Convert to NGN
        capacity: room.capacity,
        quantity: room.quantity,
        status: room.status,
        hotel: {
          id: room.hotel.id,
          name: room.hotel.name,
          address: room.hotel.address,
          status: room.hotel.status
        },
        images: room.images.map((img: RoomImage) => ({
          url: img.url,
          sortOrder: img.sortOrder
        }))
      }
    });
  } catch (error: unknown) {
    console.error('Get Room Error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
