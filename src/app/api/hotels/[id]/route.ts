import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hotelSchema } from "@/lib/validation/hotel";
import { verifyAccessToken } from "@/lib/auth";
import { Hotel, HotelAmenity, RoomType, RoomImage } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({
      where: { id, status: "APPROVED" },
      include: {
        amenities: true,
        roomTypes: {
          where: { status: "ACTIVE" },
          include: {
            images: {
              orderBy: { sortOrder: "asc" },
            },
          },
        },
      },
    });

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Hotel not found or not approved",
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        address: hotel.address,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        coverImage: hotel.coverImage,
        amenities: hotel.amenities.map((a: HotelAmenity) => ({
          code: a.amenity,
          label: a.amenity,
        })),
        roomTypes: hotel.roomTypes.map(
          (rt: RoomType & { images: RoomImage[] }) => ({
            id: rt.id,
            name: rt.name,
            description: rt.description,
            pricePerNight: rt.pricePerNight / 100, // to NGN
            capacity: rt.capacity,
            imageCount: rt.images.length,
          }),
        ),
      },
    });
  } catch (error: unknown) {
    console.error("Get Hotel Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = req.headers.get("authorization")!;
    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== "HOTEL_MANAGER") {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "Manager access required" },
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({ where: { id } });

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "Hotel not found" },
        },
        { status: 404 },
      );
    }

    if (hotel.managerId !== payload.userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Not authorized to edit this hotel",
          },
        },
        { status: 403 },
      );
    }

    const body = await req.json();
    const result = hotelSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: result.error.issues[0].message,
          },
        },
        { status: 422 },
      );
    }

    const {
      name,
      description,
      address,
      latitude,
      longitude,
      coverImage,
      amenities,
    } = result.data;

    // To update amenities properly, we delete existing and recreate
    await prisma.$transaction([
      prisma.hotelAmenity.deleteMany({ where: { hotelId: id } }),
      prisma.hotel.update({
        where: { id },
        data: {
          name,
          description,
          address,
          latitude,
          longitude,
          coverImage,
          amenities: amenities
            ? {
                create: amenities.map((amenity) => ({ amenity })),
              }
            : undefined,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Hotel updated successfully",
    });
  } catch (error: unknown) {
    console.error("Update Hotel Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
      },
      { status: 500 },
    );
  }
}
