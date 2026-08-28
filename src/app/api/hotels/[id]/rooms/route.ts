import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { roomTypeSchema } from '@/lib/validation/hotel';
import { RoomType, RoomImage } from '@prisma/client';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rooms = await prisma.roomType.findMany({
      where: { hotelId: id, status: 'ACTIVE' },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: rooms.map((rt: RoomType & { images: RoomImage[] }) => ({
        id: rt.id,
        name: rt.name,
        description: rt.description,
        pricePerNight: rt.pricePerNight / 100,
        capacity: rt.capacity,
        quantity: rt.quantity,
        images: rt.images.map((img: RoomImage) => img.url)
      }))
    });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'HOTEL_MANAGER') {
       return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Manager access required' } }, { status: 403 });
    }

    const { id } = await params;
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

    const roomType = await prisma.roomType.create({
      data: {
        hotelId: id,
        name,
        description,
        pricePerNight: pricePerNight * 100, // store in kobo
        capacity,
        quantity,
        images: {
          create: images.map((url, idx) => ({ url, sortOrder: idx }))
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        id: roomType.id,
        name: roomType.name,
        pricePerNight: roomType.pricePerNight / 100,
        capacity: roomType.capacity,
        quantity: roomType.quantity,
        status: roomType.status
      },
      message: 'Room type added successfully'
    }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
