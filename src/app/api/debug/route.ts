import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hotels = await prisma.hotel.findMany({ include: { roomTypes: true } });
  return NextResponse.json(hotels);
}
