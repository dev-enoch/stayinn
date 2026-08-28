import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { roomTypeSchema } from '@/lib/validation/hotel';
import { RoomImage } from '@prisma/client';

export async function GET(req: Request, { params }: { params: Promise<{ id: string, roomId: string }> }) {
  try {
    const { id, roomId } = await params;
    const roomType = await prisma.roomType.findUnique({
      where: { id: roomId, hotelId: id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (!roomType) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Room not found' } }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: roomType.id,
        name: roomType.name,
        description: roomType.description,
        pricePerNight: roomType.pricePerNight / 100,
        capacity: roomType.capacity,
        quantity: roomType.quantity,
        images: roomType.images.map((img: RoomImage) => ({ url: img.url, sortOrder: img.sortOrder }))
      }
    });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string, roomId: string }> }) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'HOTEL_MANAGER') {
       return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Manager access required' } }, { status: 403 });
    }

    const { id, roomId } = await params;
    const hotel = await prisma.hotel.findUnique({ where: { id: id } });

    if (!hotel || hotel.managerId !== payload.userId) {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, { status: 403 });
    }

    const body = await req.json();
    const result = roomTypeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: result.error.issues[0].message } }, { status: 422 });
    }

    const { name, description, pricePerNight, capacity, quantity, images } = result.data;

    await prisma.$transaction([
      prisma.roomImage.deleteMany({ where: { roomTypeId: roomId } }),
      prisma.roomType.update({
        where: { id: roomId },
        data: {
          name, description, pricePerNight: pricePerNight * 100, capacity, quantity,
          images: {
            create: images.map((url, idx) => ({ url, sortOrder: idx }))
          }
        }
      })
    ]);

    return NextResponse.json({ success: true, message: 'Room updated successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
