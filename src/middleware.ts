import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

// Security headers applied to every response (SI-36)
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  // Remove stack fingerprint
  response.headers.delete("x-powered-by");
  return response;
}

// Protected page routes (SI-35)
const PROTECTED_PAGE_PREFIXES = [
  "/profile",
  "/dashboard",
  "/bookings",
  "/book",
];

// Protected API prefixes that require a Bearer token (SI-37 — only known paths)
const PROTECTED_API_PREFIXES = [
  "/api/users",
  "/api/bookings",
  "/api/payments/initiate",
  "/api/admin",
  "/api/rooms",
  "/api/upload",
  "/api/hotels/me",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public health check — never auth-gated (SI-37)
  if (pathname === "/api/health") {
    return addSecurityHeaders(NextResponse.json({ status: "ok" }));
  }

  // --- Page-level auth guard (SI-35) ---
  const isProtectedPage = PROTECTED_PAGE_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );
  if (isProtectedPage) {
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return addSecurityHeaders(NextResponse.redirect(loginUrl));
    }
    const session = await verifyAccessToken(token);
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return addSecurityHeaders(NextResponse.redirect(loginUrl));
    }
  }

  // --- API auth guard (SI-37 — only on known prefixes) ---
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );
  if (isProtectedApi) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            success: false,
            error: { code: "UNAUTHORIZED", message: "Missing token" },
          },
          { status: 401 },
        ),
      );
    }
    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);
    if (!payload) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            success: false,
            error: {
              code: "TOKEN_INVALID",
              message: "Invalid or expired token",
            },
          },
          { status: 401 },
        ),
      );
    }

    // Role-based access
    if (pathname.startsWith("/api/admin") && payload.role !== "ADMIN") {
      return addSecurityHeaders(
        NextResponse.json(
          {
            success: false,
            error: { code: "FORBIDDEN", message: "Admin access required" },
          },
          { status: 403 },
        ),
      );
    }
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

export const config = {
  // Run on all page and API routes (SI-35, SI-36, SI-37)
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/bookings/:path*",
    "/book/:path*",
    "/api/:path*",
  ],
};
