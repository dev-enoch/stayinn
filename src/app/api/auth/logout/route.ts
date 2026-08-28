import { NextResponse } from 'next/server';

export async function POST() {
  // Since the refresh token is stored in the body in this API implementation
  // rather than a cookie (as per PRD token strategy but we simplified for body-based),
  // we just return success. If using cookies, we would clear the cookie here.
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
}
