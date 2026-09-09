import { NextResponse } from 'next/server';
import { getSession, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSecuritySchema = z.object({
  password: z.string().min(12, "Password must be at least 12 characters").optional(),
  twoFactorEnabled: z.boolean().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = updateSecuritySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
    }

    const { password, twoFactorEnabled } = validatedData.data;

    const dataToUpdate: any = {};
    if (password) {
      dataToUpdate.passwordHash = await hashPassword(password);
    }
    if (twoFactorEnabled !== undefined) {
      dataToUpdate.twoFactorEnabled = twoFactorEnabled;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ success: true, message: 'Nothing to update' });
    }

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: dataToUpdate,
      select: {
        twoFactorEnabled: true,
      }
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Update security error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
