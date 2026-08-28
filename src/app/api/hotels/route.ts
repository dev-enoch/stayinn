import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hotelSchema } from '@/lib/validation/hotel';
import { verifyAccessToken } from '@/lib/auth';
import { Prisma, Hotel, HotelAmenity } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Simplification for MVP: just get approved hotels, pagination, search by name
    const whereClause: Prisma.HotelWhereInput = { status: 'APPROVED' };
    if (search) {
      whereClause.name = { contains: search, mode: 'insensitive' };
    }

    const total = await prisma.hotel.count({ where: whereClause });
    const hotels = await prisma.hotel.findMany({
      where: whereClause,
      include: {
        amenities: true,
        roomTypes: {
          where: { status: 'ACTIVE' },
          select: { pricePerNight: true }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const items = hotels.map((hotel: Hotel & { amenities: HotelAmenity[], roomTypes: { pricePerNight: number }[] }) => {
      // Find starting price
      const prices = hotel.roomTypes.map((rt: { pricePerNight: number }) => rt.pricePerNight);
      const startingPrice = prices.length > 0 ? Math.min(...prices) : null;

      return {
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        coverImage: hotel.coverImage,
        amenities: hotel.amenities.map((a: HotelAmenity) => a.amenity),
        startingPrice: startingPrice ? startingPrice / 100 : null, // Convert kobo to NGN for response
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          hasMore: total > page * limit
        }
      }
    });
  } catch (error: unknown) {
    console.error('Get Hotels Error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')!;
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'HOTEL_MANAGER') {
       return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Manager access required' } }, { status: 403 });
    }

    const body = await req.json();
    const result = hotelSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: result.error.issues[0].message } }, { status: 422 });
    }

    const { name, description, address, latitude, longitude, coverImage, amenities } = result.data;

    const hotel = await prisma.hotel.create({
      data: {
        managerId: payload.userId,
        name,
        description,
        address,
        latitude,
        longitude,
        coverImage,
        amenities: amenities ? {
          create: amenities.map(amenity => ({ amenity }))
        } : undefined
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        id: hotel.id,
        name: hotel.name,
        status: hotel.status
      },
      message: 'Hotel created. Awaiting admin approval.'
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Create Hotel Error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, { status: 500 });
  }
}
