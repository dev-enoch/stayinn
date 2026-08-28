# TECHNICAL ARCHITECTURE DOCUMENT

## Stayinn — Hotel Booking Marketplace (MVP)

### Document Reference: STAYINN-ARCH-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use

## 1. ARCHITECTURE OVERVIEW

Stayinn is a single Next.js 15 full stack application. The frontend and backend are deployed together. There are no separate backend services, no separate mobile apps, and no microservices.

┌──────────────────────────────────────────────┐

│ Next.js 15 Application │

│ │

│ ┌─────────────┐ ┌──────────────────────┐ │

│ │ Pages │ │ API Routes │ │

│ │ (App │ │ (/api/...) │ │

│ │ Router) │ │ │ │

│ └──────┬──────┘ └──────────┬───────────┘ │

│ │ │ │

│ ┌──────┴─────────────────────┴───────────┐ │

│ │ Shared Layer │ │

│ │ (Auth, Prisma, Services, Validators) │ │

│ └──────┬──────────┬───────────┬───────────┘ │

│ │ │ │ │

└─────────┼──────────┼───────────┼───────────────┘

│ │ │

┌─────┴────┐ ┌───┴───┐ ┌─────┴──────┐

│PostgreSQL│ │ Redis │ │ AWS S3 │

│(Prisma) │ │(Cache)│ │ (Images) │

└──────────┘ └───────┘ └────────────┘

│

┌─────┴─────┐

│ Paystack │

│ (Payments)│

└───────────┘

## 2. TECHNOLOGY STACK

### 2.1 Application

| **Component** | **Technology** | **Version** |
| --- | --- | --- |
| Framework | Next.js | 15.x (App Router) |
| Language | TypeScript | 5.x |
| Runtime | Node.js | 20.x LTS |
| Package Manager | pnpm | 9.x |

### 2.2 Frontend

| **Component** | **Technology** |
| --- | --- |
| Styling | Tailwind CSS 4.x |
| UI Components | Custom components (no heavy UI library) |
| Icons | Lucide React |
| Maps | @react-google-maps/api |
| QR Code | qrcode.react (rendering), qrcode (server-side generation) |
| QR Scanning | html5-qrcode (camera-based scanning in browser) |
| Form Handling | react-hook-form + Zod |
| Image Handling | next/image with S3 loader |

### 2.3 Backend

| **Component** | **Technology** |
| --- | --- |
| API | Next.js API Routes (App Router route handlers) |
| ORM | Prisma Client |
| Database | PostgreSQL 16 |
| Cache | Redis 7 (via ioredis) |
| Auth | Custom JWT implementation (jose library) |
| Validation | Zod |
| Payment | Paystack Node SDK (or direct HTTP) |
| Email | Resend (or Amazon SES) |
| File Upload | AWS S3 SDK v3 |
| Queue | BullMQ (for booking expiry, email sending) |

### 2.4 Infrastructure

| **Component** | **Technology** |
| --- | --- |
| Hosting | Vercel (primary) or AWS EC2 (alternative) |
| Database Hosting | Supabase, Neon, or AWS RDS |
| Redis Hosting | Upstash or AWS ElastiCache |
| Image Storage | AWS S3 |
| CDN | Vercel Edge Network (or CloudFront if on AWS) |
| CI/CD | GitHub Actions |
| DNS | Cloudflare or Vercel DNS |
| SSL | Automatic (Vercel) or Let's Encrypt (AWS) |

## 3. PROJECT STRUCTURE

stayinn/

├── prisma/

│ └── schema.prisma

├── src/

│ ├── app/

│ │ ├── (public)/

│ │ │ ├── page.tsx # For You page

│ │ │ ├── hotels/[id]/page.tsx # Hotel Store page

│ │ │ └── hotels/[id]/rooms/[roomId]/page.tsx # Room Detail

│ │ ├── (auth)/

│ │ │ ├── login/page.tsx

│ │ │ └── register/page.tsx

│ │ ├── (booker)/

│ │ │ ├── booking/[id]/page.tsx # Booking confirmation + QR

│ │ │ ├── bookings/page.tsx # My Bookings

│ │ │ └── checkout/

│ │ │ ├── guests/page.tsx # Step 1

│ │ │ ├── dates/page.tsx # Step 2

│ │ │ ├── summary/page.tsx # Step 3

│ │ │ └── payment/page.tsx # Step 4

│ │ ├── (manager)/

│ │ │ ├── dashboard/page.tsx # Manager dashboard

│ │ │ ├── hotel/

│ │ │ │ ├── setup/page.tsx # Create/edit hotel

│ │ │ │ └── rooms/

│ │ │ │ ├── page.tsx # List rooms

│ │ │ │ └── [roomId]/page.tsx # Edit room

│ │ │ ├── bookings/page.tsx # Hotel bookings

│ │ │ ├── scanner/page.tsx # QR Scanner

│ │ │ └── earnings/page.tsx # Earnings view

│ │ ├── (admin)/

│ │ │ ├── dashboard/page.tsx

│ │ │ ├── approvals/page.tsx

│ │ │ ├── hotels/page.tsx

│ │ │ ├── bookings/page.tsx

│ │ │ └── settings/page.tsx # Commission settings

│ │ └── api/

│ │ ├── auth/

│ │ │ ├── register/route.ts

│ │ │ ├── login/route.ts

│ │ │ ├── refresh/route.ts

│ │ │ └── logout/route.ts

│ │ ├── hotels/

│ │ │ ├── route.ts # GET list, POST create

│ │ │ └── [id]/

│ │ │ ├── route.ts # GET detail, PUT update

│ │ │ ├── rooms/route.ts # GET rooms, POST add room

│ │ │ └── rooms/[roomId]/

│ │ │ ├── route.ts # GET, PUT, DELETE room

│ │ │ └── images/route.ts # POST upload images

│ │ ├── bookings/

│ │ │ ├── route.ts # POST create booking

│ │ │ └── [id]/

│ │ │ ├── route.ts # GET booking detail

│ │ │ └── confirm/route.ts # POST confirm via QR scan

│ │ ├── bookings/me/route.ts # GET my bookings

│ │ ├── bookings/hotel/[hotelId]/route.ts # GET hotel bookings

│ │ ├── payments/

│ │ │ ├── initiate/route.ts # POST initiate Paystack

│ │ │ ├── callback/route.ts # GET Paystack redirect

│ │ │ └── webhook/route.ts # POST Paystack webhook

│ │ ├── admin/

│ │ │ ├── hotels/pending/route.ts

│ │ │ ├── hotels/[id]/approve/route.ts

│ │ │ ├── hotels/[id]/suspend/route.ts

│ │ │ ├── commission/route.ts

│ │ │ └── analytics/route.ts

│ │ └── upload/route.ts # POST image upload to S3

│ ├── lib/

│ │ ├── prisma.ts # Prisma client singleton

│ │ ├── redis.ts # Redis client singleton

│ │ ├── auth.ts # JWT functions (sign, verify)

│ │ ├── paystack.ts # Paystack API client

│ │ ├── qr.ts # QR code generation + signing

│ │ ├── email.ts # Email sending (Resend)

│ │ ├── s3.ts # S3 upload helper

│ │ ├── validation/ # Zod schemas

│ │ │ ├── auth.ts

│ │ │ ├── hotel.ts

│ │ │ ├── booking.ts

│ │ │ └── payment.ts

│ │ └── middleware-helpers.ts # Rate limiting, role checks

│ ├── components/

│ │ ├── ui/ # Reusable UI components

│ │ ├── hotel/ # Hotel-specific components

│ │ ├── booking/ # Booking flow components

│ │ ├── manager/ # Manager dashboard components

│ │ └── admin/ # Admin components

│ └── middleware.ts # Auth middleware, route protection

├── public/

├── .env.example

├── package.json

├── tsconfig.json

├── tailwind.config.ts

├── next.config.ts

└── prisma/schema.prisma

## 4. AUTHENTICATION ARCHITECTURE

### 4.1 Token Strategy

* Access Token: JWT, RS256 signed, 15-minute expiry. Contains userId, role, email.
* Refresh Token: JWT, RS256 signed, 7-day expiry. Contains userId only. Stored in an httpOnly cookie.
* Access token is stored in memory (React state/context). Not in localStorage.
* Refresh token is stored in an httpOnly, secure, sameSite=lax cookie.

### 4.2 Middleware

The Next.js middleware (src/middleware.ts) intercepts all requests to:

1. Protected routes (/(booker), /(manager), /(admin)) — requires valid access token. If expired, attempts refresh using the httpOnly cookie.
2. Role-based route protection — bookers cannot access /manager or /admin routes. Managers cannot access /admin routes.
3. API routes under /api/ — validates JWT for protected endpoints.

### 4.3 Password Security

* bcrypt with cost factor 12
* Minimum password length: 8 characters
* Passwords are never returned in any API response

## 5. PAYMENT ARCHITECTURE

### 5.1 Flow

1. User completes booking Step 3 (price summary)

2. App calls POST /api/payments/initiate with bookingId

3. Server creates Paystack transaction via Paystack API

4. Server returns Paystack authorization URL

5. User is redirected to Paystack checkout

6. User pays (card, bank transfer, USSD)

7. Paystack redirects to /api/payments/callback?reference=xxx

8. Server verifies payment via Paystack Transaction Verify API

9. Server updates booking to PAID

10. Server generates QR code with HMAC-SHA256 signature

11. Server sends confirmation email with QR code

12. Paystack also sends webhook to /api/payments/webhook (source of truth)

13. Webhook handler verifies signature, updates booking (idempotent)

### 5.2 Idempotency

Both the callback and webhook can fire for the same payment. The system handles this by:

* Checking booking status before updating. If already PAID, skip.
* Using the Paystack transaction reference as a unique constraint in the payment table.

## 6. QR CODE ARCHITECTURE

### 6.1 Generation

After payment is confirmed:

1. Server constructs a JSON payload: { bookingId, hotelId, roomTypeId, guestName, checkInDate, checkOutDate, numberOfGuests, paymentAmount }
2. Server computes HMAC-SHA256 of the JSON payload using a server-side secret (QR\_SIGNING\_KEY env variable)
3. Server appends the signature to the payload
4. Server encodes the full payload as a QR code PNG
5. Server stores the QR data and signature in the booking record

### 6.2 Verification (Hotel Manager Scan)

1. Hotel manager opens QR scanner in browser (html5-qrcode library)
2. Scanner decodes the QR code to JSON
3. App sends the decoded payload to POST /api/bookings/[id]/confirm
4. Server verifies the HMAC-SHA256 signature
5. Server checks: booking exists, status is PAID, current date is within valid range
6. If valid, server updates booking to CONFIRMED, creates payout record
7. Server returns booking details to the hotel manager

## 7. CACHING STRATEGY

### 7.1 Hotel Listings

* Cache the For You page hotel list in Redis with a key based on filter parameters
* TTL: 5 minutes
* Invalidate cache when a hotel is created, updated, approved, or suspended

### 7.2 Hotel Detail

* Cache hotel detail (with room types) in Redis
* Key: hotel:{id}
* TTL: 10 minutes
* Invalidate on hotel update, room type add/edit/deactivate

### 7.3 Commission Rate

* Cache the current global commission rate in Redis
* Key: commission:global
* TTL: 1 hour
* Invalidate when admin updates the rate

## 8. BACKGROUND JOBS

### 8.1 Booking Expiry

* A BullMQ worker runs every 1 minute
* Finds all bookings with status PENDING and createdAt older than 30 minutes
* Updates status to CANCELLED
* Releases held availability

### 8.2 Email Sending

* Booking confirmation email (with QR code) — queued via BullMQ
* Hotel approval/rejection notification — queued via BullMQ
* Booking cancellation notification — queued via BullMQ

## 9. ERROR HANDLING

### 9.1 API Error Response Format

All API errors return a consistent JSON structure:

{

"success": false,

"error": {

"code": "BOOKING\_NOT\_AVAILABLE",

"message": "This room is fully booked for the selected dates.",

"field": "checkInDate"

}

}

### 9.2 Error Codes

| **Code** | **HTTP Status** | **Description** |
| --- | --- | --- |
| INVALID\_CREDENTIALS | 401 | Wrong email/password |
| TOKEN\_EXPIRED | 401 | Access token expired |
| TOKEN\_INVALID | 401 | Invalid or tampered token |
| FORBIDDEN | 403 | Role not permitted |
| NOT\_FOUND | 404 | Resource not found |
| VALIDATION\_ERROR | 422 | Input validation failed |
| BOOKING\_NOT\_AVAILABLE | 409 | Room fully booked |
| PAYMENT\_FAILED | 402 | Paystack payment failed |
| QR\_INVALID | 400 | QR code signature mismatch |
| RATE\_LIMITED | 429 | Too many requests |
| INTERNAL\_ERROR | 500 | Unhandled server error |

## 10. ENVIRONMENT VARIABLES

# Database

DATABASE\_URL=postgresql://user:password@host:5432/stayinn

# Redis

REDIS\_URL=redis://host:6379

# Auth

JWT\_ACCESS\_SECRET=<random-256-bit-key>

JWT\_REFRESH\_SECRET=<random-256-bit-key>

QR\_SIGNING\_KEY=<random-256-bit-key>

# Paystack

PAYSTACK\_SECRET\_KEY=sk\_test\_xxx

PAYSTACK\_PUBLIC\_KEY=pk\_test\_xxx

PAYSTACK\_WEBHOOK\_SECRET=whk\_xxx

# AWS S3

AWS\_ACCESS\_KEY\_ID=xxx

AWS\_SECRET\_ACCESS\_KEY=xxx

AWS\_REGION=eu-west-1

S3\_BUCKET\_NAME=stayinn-images

# Google Maps

NEXT\_PUBLIC\_GOOGLE\_MAPS\_API\_KEY=xxx

# Email

RESEND\_API\_KEY=xxx

FROM\_EMAIL=noreply@stayinn.ng

# App

NEXT\_PUBLIC\_APP\_URL=https://stayinn.ng

NODE\_ENV=production

*End of Document — Stayinn Technical Architecture v1.0.0*