import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import SecurityClient from './SecurityClient';

export const dynamic = 'force-dynamic';

export default async function SecurityPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) redirect('/login');

  const session = await verifyAccessToken(token);
  if (!session?.userId) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      twoFactorEnabled: true,
    }
  });

  if (!user) redirect('/login');

  return <SecurityClient user={user} />;
}
