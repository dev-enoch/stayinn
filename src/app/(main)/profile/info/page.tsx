import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProfileInfoClient from './ProfileInfoClient';

export const dynamic = 'force-dynamic';

export default async function ProfileInfoPage() {
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
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
    }
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <ProfileInfoClient user={user} />
    </div>
  );
}
