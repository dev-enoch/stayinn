import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import ProfilePaymentsClient from './ProfilePaymentsClient';

export const dynamic = 'force-dynamic';

export default async function ProfilePaymentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const session = await verifyAccessToken(token);
  if (!session?.userId) {
    redirect('/login');
  }

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <ProfilePaymentsClient />
    </div>
  );
}
