import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProfilePreferencesClient from './ProfilePreferencesClient';

export const dynamic = 'force-dynamic';

export default async function ProfilePreferencesPage() {
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
      powerRequirement: true,
      internetRequirement: true,
    }
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <ProfilePreferencesClient user={user} />
    </div>
  );
}
