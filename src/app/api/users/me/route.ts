import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required").optional(),
  phone: z.string().min(10, "Valid phone number is required").optional(),
});

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = updateProfileSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Validation failed', 
        details: validatedData.error.format() 
      }, { status: 400 });
    }

    const { fullName, phone } = validatedData.data;

    // Optional: check if phone is unique if changed
    if (phone) {
      const existingUserWithPhone = await prisma.user.findUnique({
        where: { phone }
      });
      if (existingUserWithPhone && existingUserWithPhone.id !== session.userId) {
        return NextResponse.json({ success: false, error: 'Phone number already in use' }, { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(fullName && { fullName }),
        ...(phone && { phone }),
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
