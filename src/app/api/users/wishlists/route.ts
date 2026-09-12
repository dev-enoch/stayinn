import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Get wishlists
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const wishlists = await prisma.wishlist.findMany({
      where: { userId: session.userId },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            address: true,
            coverImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: wishlists });
  } catch (error) {
    console.error("Get wishlists error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Toggle wishlist item
const toggleWishlistSchema = z.object({
  hotelId: z.string().min(1, "Hotel ID is required"),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const validatedData = toggleWishlistSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed" },
        { status: 400 },
      );
    }

    const { hotelId } = validatedData.data;

    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_hotelId: {
          userId: session.userId,
          hotelId: hotelId,
        },
      },
    });

    if (existingItem) {
      // Remove it
      await prisma.wishlist.delete({
        where: { id: existingItem.id },
      });
      return NextResponse.json({ success: true, action: "removed" });
    } else {
      // Add it
      const newItem = await prisma.wishlist.create({
        data: {
          userId: session.userId,
          hotelId: hotelId,
        },
      });
      return NextResponse.json({
        success: true,
        action: "added",
        data: newItem,
      });
    }
  } catch (error) {
    console.error("Toggle wishlist error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
