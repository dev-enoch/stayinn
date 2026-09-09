import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProfileSecurityClient from './ProfileSecurityClient';

export const dynamic = 'force-dynamic';

export default async function ProfileSecurityPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const session = await verifyAccessToken(token);
  if (!session?.userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      twoFactorEnabled: true,
    }
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <ProfileSecurityClient user={user} />
    </div>
  );
}
