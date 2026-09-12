import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updatePreferencesSchema = z.object({
  powerRequirement: z.string().nullable().optional(),
  internetRequirement: z.string().nullable().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const validatedData = updatePreferencesSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed" },
        { status: 400 },
      );
    }

    const { powerRequirement, internetRequirement } = validatedData.data;

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(powerRequirement !== undefined && { powerRequirement }),
        ...(internetRequirement !== undefined && { internetRequirement }),
      },
      select: {
        powerRequirement: true,
        internetRequirement: true,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Update preferences error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
