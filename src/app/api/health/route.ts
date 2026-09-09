import { NextResponse } from "next/server";

// Public health check endpoint — no auth required (SI-37)
// Used by uptime monitors and load balancers.
export async function GET() {
  return NextResponse.json({ status: "ok", ts: Date.now() });
}
