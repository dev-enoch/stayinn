import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect API routes
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/') && !pathname.startsWith('/api/payments/webhook') && !pathname.startsWith('/api/payments/callback') && !pathname.startsWith('/api/hotels') && !pathname.startsWith('/api/docs')) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Missing token' } }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: { code: 'TOKEN_INVALID', message: 'Invalid or expired token' } }, { status: 401 });
    }
    
    // Check Role-based access for API
    if (pathname.startsWith('/api/admin') && payload.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } }, { status: 403 });
    }
    if (pathname.startsWith('/api/hotels/') && request.method !== 'GET' && payload.role !== 'HOTEL_MANAGER' && payload.role !== 'ADMIN') {
        return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Manager access required' } }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
