import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Get saved cards
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const savedCards = await prisma.savedCard.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: savedCards });
  } catch (error) {
    console.error('Get saved cards error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Mock endpoint to add a fake card for testing
const addCardSchema = z.object({
  last4: z.string().length(4),
  expMonth: z.string().length(2),
  expYear: z.string().length(2),
  brand: z.string(),
  bank: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = addCardSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
    }

    const { last4, expMonth, expYear, brand, bank } = validatedData.data;

    // Generate fake auth code
    const authorizationCode = `AUTH_${Math.random().toString(36).substring(2, 15)}`;

    const newCard = await prisma.savedCard.create({
      data: {
        userId: session.userId,
        authorizationCode,
        last4,
        expMonth,
        expYear,
        brand,
        bank,
      }
    });

    return NextResponse.json({ success: true, data: newCard });
  } catch (error) {
    console.error('Add saved card error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a card
export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const cardId = url.searchParams.get('id');

    if (!cardId) {
      return NextResponse.json({ success: false, error: 'Card ID required' }, { status: 400 });
    }

    // Verify ownership
    const card = await prisma.savedCard.findUnique({ where: { id: cardId } });
    if (!card || card.userId !== session.userId) {
      return NextResponse.json({ success: false, error: 'Card not found' }, { status: 404 });
    }

    await prisma.savedCard.delete({
      where: { id: cardId }
    });

    return NextResponse.json({ success: true, message: 'Card deleted' });
  } catch (error) {
    console.error('Delete saved card error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
