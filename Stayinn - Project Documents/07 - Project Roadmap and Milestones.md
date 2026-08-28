# PROJECT ROADMAP AND MILESTONES

## Stayinn — Hotel Booking Marketplace (MVP)

### Document Reference: STAYINN-ROADMAP-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use

## 1. OVERVIEW

The Stayinn MVP is built as a single Next.js 15 full stack application. The development timeline is 8 weeks from PRD approval to production deployment. The build is divided into 6 phases, each with clearly defined exit criteria.

## 2. PHASE 1: PROJECT SETUP AND DATABASE (Week 1)

### Objectives

Initialize the Next.js project, configure the database, set up infrastructure, and create the Prisma schema with all migrations.

### Tasks

1. Initialize Next.js 15 project with TypeScript, App Router, and Tailwind CSS 4
2. Configure pnpm, ESLint, Prettier, and TypeScript strict mode
3. Set up Prisma with PostgreSQL (Supabase or Neon for development)
4. Write the complete Prisma schema (as specified in STAYINN-DB-001)
5. Run initial migration
6. Seed database with: admin user, commission setting (10%)
7. Set up Redis (Upstash for development)
8. Configure environment variables (.env.example)
9. Set up GitHub repository with branch protection (main requires PR review)
10. Configure GitHub Actions CI: lint, type-check, build on every PR
11. Install and configure all dependencies:
    * prisma, @prisma/client
    * ioredis
    * jose (JWT)
    * zod
    * react-hook-form, @hookform/resolvers
    * lucide-react
    * qrcode, qrcode.react
    * html5-qrcode
    * @react-google-maps/api
    * @aws-sdk/client-s3
    * resend (or @aws-sdk/client-ses)
    * bullmq
12. Create the shared lib layer: prisma.ts (singleton), redis.ts (singleton), auth.ts, validation schemas

### Exit Criteria

* Next.js project runs locally (pnpm dev)
* Prisma migration applied successfully
* Database seed script runs without errors
* CI pipeline passes on a test PR
* All environment variables documented in .env.example

## 3. PHASE 2: AUTHENTICATION AND CORE API (Weeks 2-3)

### Objectives

Build the authentication system, hotel CRUD APIs, room type CRUD APIs, and the upload endpoint.

### Week 2: Authentication + Hotel APIs

1. Implement password hashing (bcrypt, cost 12)
2. Implement JWT generation and verification (jose library, RS256)
3. Build POST /auth/register
4. Build POST /auth/login
5. Build POST /auth/refresh
6. Build POST /auth/logout
7. Implement middleware.ts for route protection and role-based access
8. Implement rate limiting middleware (auth: 5/min, others: 60/min)
9. Build POST /upload (S3 image upload, JPEG/PNG, max 5MB)
10. Build POST /hotels (create hotel, HOTEL\_MANAGER only)
11. Build PUT /hotels/:id (update hotel, owner only)
12. Build GET /hotels (list approved hotels with filters, search, pagination, proximity sort)
13. Build GET /hotels/:id (hotel detail with amenities and room types)
14. Implement Redis caching for hotel list and hotel detail
15. Write integration tests for auth and hotel endpoints

### Week 3: Room APIs + Booking Creation

1. Build POST /hotels/:hotelId/rooms (add room type)
2. Build PUT /hotels/:hotelId/rooms/:roomId (update room type)
3. Build GET /hotels/:hotelId/rooms/:roomId (room detail with images)
4. Build POST /bookings (create booking with availability check)
5. Implement availability check query (overlapping booking count)
6. Build GET /bookings/:id
7. Build GET /bookings/me
8. Build GET /bookings/hotel/:hotelId
9. Build POST /bookings/:id/cancel
10. Implement booking expiry background job (BullMQ, runs every 1 minute, cancels bookings older than 30 minutes in PENDING status)
11. Write integration tests for room and booking endpoints

### Exit Criteria

* All auth endpoints functional and tested
* Rate limiting active on auth endpoints
* Hotel manager can create a hotel, add room types with images
* Booker can create a booking (PENDING status)
* Availability check prevents double-booking
* Booking expiry job runs and cancels expired bookings
* All integration tests pass

## 4. PHASE 3: PAYMENTS AND QR CODES (Week 4)

### Objectives

Integrate Paystack, build the payment flow, implement QR code generation and verification.

### Tasks

1. Create Paystack test account and obtain test keys
2. Build POST /payments/initiate
3. Build GET /payments/callback (Paystack redirect handler)
4. Build POST /payments/webhook (Paystack webhook handler with signature verification)
5. Implement Paystack Transaction Verify API call (server-side verification)
6. Implement idempotency: check payment status before processing webhook
7. Implement QR code generation: a. Construct JSON payload (bookingId, hotelId, roomTypeId, guestName, checkInDate, checkOutDate, numberOfGuests, paymentAmount) b. Compute HMAC-SHA256 signature using QR\_SIGNING\_KEY c. Generate QR code PNG d. Store qrData and qrSignature on booking record
8. Build POST /bookings/:id/confirm (QR verification endpoint for hotel managers)
9. Implement QR verification: signature check, booking status check, date range check
10. Build email sending (Resend): booking confirmation with QR code attachment
11. Configure Paystack webhook URL in Paystack dashboard
12. Test full payment flow in Paystack test mode
13. Write integration tests for payment and QR endpoints

### Exit Criteria

* Booker can complete payment via Paystack (test mode)
* Paystack webhook updates booking to PAID
* QR code is generated and emailed to the booker
* Hotel manager can scan QR code and confirm check-in
* Payout record is created on confirmation
* Forged QR codes are rejected
* Payment idempotency works (duplicate webhooks do not create duplicate records)

## 5. PHASE 4: FRONTEND — BOOKER PAGES (Weeks 5-6)

### Objectives

Build all booker-facing pages: For You, Hotel Store, Room Detail, Booking Flow, Booking Confirmation, My Bookings.

### Week 5: Discovery and Hotel Pages

1. Build layout components: bottom navigation (booker), header
2. Build For You page: a. Hotel cards (cover image, name, location, starting price) b. Infinite scroll (load more on scroll near bottom) c. Search bar d. Filter panel (price, amenities, sort) e. Location permission prompt f. Empty state (no hotels found) g. Loading skeleton screens
3. Build Hotel Store page: a. Cover image b. Hotel name, address, amenities badges c. Google Maps embed with hotel pin d. Room types list (menu-style cards)
4. Build Room Detail page: a. Swipeable photo gallery b. Room info (name, description, capacity, price) c. "Book This Room" sticky button d. Authentication gate (redirect to login if not authenticated)
5. Build Login page
6. Build Register page (with role selection)

### Week 6: Booking Flow and Confirmation

1. Build Booking Step 1: Guests (number input, default 2, min/max from room capacity)
2. Build Booking Step 2: Dates (calendar pickers, nights calculation)
3. Build Booking Step 3: Price Summary (itemized breakdown, total)
4. Build Booking Step 4: Payment (redirect to Paystack, handle callback)
5. Build Booking Confirmation page (QR code display, booking details, save/view on map buttons)
6. Build My Bookings page (list with status badges, filter by status)
7. Build Booking Detail page (QR code for PAID bookings, cancel button for eligible bookings)
8. Build Profile/Settings page (basic: name, email, phone, logout)
9. Implement error states and empty states for all pages
10. Test responsive design on 320px, 768px, and 1280px viewports

### Exit Criteria

* User can browse For You page, open hotels, view rooms without logging in
* User can register, log in, and complete the full booking flow
* QR code displays on confirmation page after payment
* My Bookings shows all user bookings with correct status badges
* All pages are responsive on mobile, tablet, and desktop
* Loading skeletons show during data fetching
* Error states display gracefully

## 6. PHASE 5: FRONTEND — MANAGER AND ADMIN PAGES (Week 7)

### Objectives

Build the hotel manager interface and admin panel.

### Manager Pages

1. Build Manager layout (bottom navigation: Dashboard, Bookings, Scanner, Profile)
2. Build Hotel Setup flow (multi-step: information, cover image, amenities, submit)
3. Build Manager Dashboard (summary cards: today's arrivals, this week, this month's earnings)
4. Build Rooms List page (list of room types with edit/deactivate)
5. Build Add/Edit Room Type page (form with image upload, all fields)
6. Build Hotel Bookings page (list with filters, status badges)
7. Build QR Scanner page (html5-qrcode camera integration, scan, verify, confirm)
8. Build Earnings page (summary cards, table of confirmed bookings with payouts)
9. Build Manager Profile page

### Admin Pages (Desktop-focused)

1. Build Admin layout (sidebar navigation: Dashboard, Approvals, Hotels, Bookings, Settings)
2. Build Admin Dashboard (analytics cards, bookings chart, revenue chart)
3. Build Approvals page (pending hotels list, review detail, approve/reject)
4. Build Hotels List page (all hotels with status filter, suspend/reinstate actions)
5. Build Bookings List page (all bookings with filters)
6. Build Commission Settings page (current rate, update form)
7. Build Users List page (all users with role filter)

### Exit Criteria

* Hotel manager can register, set up a hotel, and add room types
* Hotel manager can scan QR codes and confirm check-in
* Hotel manager can view earnings with commission breakdown
* Admin can approve/reject hotels, set commission, and view analytics
* All manager pages work on mobile (320px+)
* All admin pages work on desktop (1024px+)

## 7. PHASE 6: TESTING, POLISH, AND DEPLOYMENT (Week 8)

### Objectives

End-to-end testing, bug fixing, performance optimization, and production deployment.

### Tasks

1. End-to-end test: full booking flow (browse, register, book, pay, QR, scan, confirm)
2. End-to-end test: hotel manager flow (register, setup hotel, add rooms, scan, earnings)
3. End-to-end test: admin flow (approve hotel, set commission, view analytics)
4. Test edge cases: a. Double booking attempt b. Payment failure and retry c. Booking expiry (wait 30 minutes) d. QR code with invalid signature e. QR code after check-out date f. Hotel suspension with active bookings
5. Cross-browser testing: Chrome, Safari, Firefox (latest versions)
6. Responsive testing: iPhone SE (320px), iPhone 14 (390px), iPad (768px), desktop (1280px)
7. Performance optimization: a. Image optimization (next/image with S3 loader, lazy loading) b. API response caching (Redis) c. Bundle size analysis (reduce if over 500KB initial JS) d. Lighthouse audit (target: 90+ performance score on mobile)
8. SEO basics: meta tags, Open Graph, sitemap.xml, robots.txt
9. Error monitoring: set up Sentry (or similar)
10. Deploy to production (Vercel or AWS)
11. Configure custom domain (stayinn.ng)
12. Configure Paystack production keys
13. Smoke test in production
14. Write README.md with setup instructions, deployment guide, and API documentation link
15. Client handover session

### Exit Criteria

* All end-to-end tests pass
* All edge cases handled without crashes
* Lighthouse performance score 90+ on mobile
* Application deployed and accessible at stayinn.ng
* Paystack production payments working
* Full booking flow tested in production with a real test hotel
* README and documentation delivered

## 8. TIMELINE SUMMARY

| **Week** | **Phase** | **Focus** | **Exit Criteria** |
| --- | --- | --- | --- |
| 1 | Phase 1 | Project setup, database, infrastructure | Project runs, migrations applied, CI passes |
| 2 | Phase 2 | Auth, hotel APIs, upload | Auth works, hotels CRUD works |
| 3 | Phase 2 | Room APIs, booking creation, expiry job | Bookings work, availability check works |
| 4 | Phase 3 | Paystack, QR codes, webhook, email | Full payment flow works in test mode |
| 5 | Phase 4 | For You, Hotel Store, Room Detail, Login, Register | Discovery and browsing works |
| 6 | Phase 4 | Booking flow, confirmation, My Bookings, Profile | Full booker flow works end-to-end |
| 7 | Phase 5 | Manager pages, Admin pages | Manager and admin flows work |
| 8 | Phase 6 | Testing, optimization, deployment | Production deployed, all tests pass |

## 9. DELIVERABLES CHECKLIST

At the end of the project, the following shall be delivered:

1. Source code (GitHub repository, main branch)
2. Production deployment (stayinn.ng)
3. Staging deployment (staging.stayinn.ng, optional)
4. Database schema and migrations
5. Environment variables documentation (.env.example with all variables listed)
6. README.md with: a. Project overview b. Local development setup instructions c. Database setup instructions d. Deployment instructions e. Paystack configuration instructions f. Google Maps API setup instructions g. S3 bucket setup instructions
7. Admin account credentials (delivered securely)
8. All 7 specification documents (PRD, Architecture, User Flows, Design System, Database Schema, API Spec, Roadmap)

## 10. RISKS AND MITIGATIONS

| **Risk** | **Probability** | **Impact** | **Mitigation** |
| --- | --- | --- | --- |
| Paystack integration issues | Low | High | Start payment integration in Week 4. Use Paystack test mode for all development. |
| Google Maps API costs | Low | Medium | Use free tier ($200/month credit). Monitor usage. Set billing alerts. |
| S3 upload failures | Low | Medium | Implement retry logic. Validate file size and type before upload. |
| QR scanning fails on low-end cameras | Medium | Medium | Use html5-qrcode with fallback to manual booking ID entry. |
| Booking expiry job misses | Low | High | Use BullMQ with retry. Monitor job failures. Add manual expiry check as fallback in booking creation. |
| Paystack webhook not received | Medium | High | Webhook has 72-hour retry from Paystack. Also verify payment on callback redirect. |
| Database connection pool exhaustion | Low | High | Use connection pooling (PgBouncer or Prisma's connection pool). Monitor active connections. |

*End of Document — Stayinn Project Roadmap v1.0.0*