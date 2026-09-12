# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Monarch Stay — Hotel Booking Marketplace (MVP)

### Document Reference: MONARCH_STAY-PRD-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use **Prepared by:** Contractor (Solas) **Client:** Enoch Philip Dibal

## 1. EXECUTIVE SUMMARY

Monarch Stay is a mobile-first web application built with Next.js that enables users to discover hotels, view room types with photos, book rooms through a step-by-step flow, pay through Paystack, and present a QR code at the hotel for check-in. Hotel managers list their properties, manage rooms, scan QR codes to confirm guest arrivals, and receive payouts. A platform admin approves hotels and manages commission rates.

This MVP is built as a single Next.js full stack application. There are no separate mobile apps or backend services. The application serves three user roles (Booker, Hotel Manager, Admin) through role-based routing and access control within one codebase.

The application is designed for the Nigerian market. All currency values are in Nigerian Naira (NGN). The payment gateway is Paystack. The maps provider is Google Maps.

## 2. SCOPE

### 2.1 In Scope (MVP)

1. User registration and authentication for three roles: Booker, Hotel Manager, Admin
2. Hotel discovery page ("For You") with search, filter, and location-based listing
3. Hotel detail page ("Hotel Store") with amenities and room types displayed as a menu
4. Room detail page with photo gallery
5. Booking flow: room selection, guest count, date selection, price calculation, payment, QR code generation
6. Payment processing through Paystack with webhook verification
7. QR code generation with cryptographic signing
8. Hotel manager dashboard: hotel profile, room management, booking list, QR scanner, earnings view
9. Admin dashboard: hotel approval, commission management, platform analytics
10. Map-based hotel addresses using Google Maps
11. Image upload for hotel covers and room photos (AWS S3)

### 2.2 Out of Scope (Post-MVP)

1. Native mobile applications (iOS/Android) — the MVP is a responsive web app
2. Hotel reviews and ratings system
3. Multiple languages — English only
4. Multiple countries — Nigeria only
5. Refund processing through the app — refunds are handled manually by admin in the MVP
6. Push notifications — email notifications only in the MVP
7. Advanced analytics (cohort analysis, retention curves, etc.)
8. Hotel calendar availability view — bookings are accepted based on room quantity tracking only
9. Loyalty or referral programs
10. Social features (sharing, following)

## 3. USER ROLES

### 3.1 Booker

A registered user who searches for hotels, views rooms, books, pays, and checks in using a QR code. A booker can also browse hotels without registering, but must create an account before making a booking.

### 3.2 Hotel Manager

A registered user who owns or manages a hotel. The hotel manager creates the hotel profile, adds room types with photos, views incoming bookings, scans QR codes to confirm guest check-in, and views earnings. A hotel manager account must be approved by an admin before their hotel goes live.

### 3.3 Admin

A registered user with platform-level access. The admin approves or rejects hotel listings, sets commission rates, views platform-wide analytics, and manages users. Admin accounts are created manually in the database during deployment.

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Authentication and Authorization

**FR-AUTH-001:** The system shall provide user registration via email and password. **FR-AUTH-002:** The system shall provide user registration via phone number and password. **FR-AUTH-003:** The system shall require users to select a role (BOOKER or HOTEL\_MANAGER) during registration. **FR-AUTH-004:** The system shall provide login via email or phone number with password. **FR-AUTH-005:** The system shall issue a JWT access token (15-minute expiry) and a refresh token (7-day expiry) upon successful authentication. **FR-AUTH-006:** The system shall refresh access tokens using valid refresh tokens. **FR-AUTH-007:** The system shall revoke refresh tokens on logout. **FR-AUTH-008:** The system shall enforce role-based access control on all API routes. Bookers cannot access hotel manager or admin routes. Hotel managers cannot access admin routes. **FR-AUTH-009:** The system shall allow unauthenticated users to browse the For You page and view hotel details. Authentication shall be required only when initiating a booking. **FR-AUTH-010:** Passwords shall be hashed using bcrypt with a cost factor of 12. **FR-AUTH-011:** The system shall rate-limit authentication endpoints to 5 requests per minute per IP address.

### 4.2 Hotel Discovery ("For You" Page)

**FR-DISC-001:** The system shall display a list of approved hotels on the For You page. **FR-DISC-002:** Each hotel card shall display: hotel cover image, hotel name, location (area/city), and starting price (lowest room type price per night). **FR-DISC-003:** The system shall display a maximum of 10 hotel cards per page with infinite scroll for additional results. **FR-DISC-004:** The system shall provide a search bar that allows users to search by hotel name or area name. **FR-DISC-005:** The system shall provide the following filters: a. Price range (min and max NGN) b. Amenities (multi-select: WiFi, Water, Backup Power, Parking, Pool, Gym, Restaurant, AC) c. Sort by: Price (low to high), Price (high to low), Distance (nearest first) **FR-DISC-006:** If the user grants location permission, the system shall sort hotels by proximity to the user's current location and display distance in kilometers. **FR-DISC-007:** If the user denies location permission, the system shall display hotels sorted by creation date (newest first). **FR-DISC-008:** The system shall only display hotels with status APPROVED.

### 4.3 Hotel Store Page

**FR-STORE-001:** When a user taps a hotel card, the system shall navigate to the Hotel Store Page for that hotel. **FR-STORE-002:** The Hotel Store Page shall display the following sections in order: a. Hotel cover image (full width, 16:9 aspect ratio) b. Hotel name (H2, bold) c. Hotel address with a map pin icon d. Amenities badges row (pill-shaped, horizontally scrollable) e. Map preview (Google Maps embed showing hotel location, tappable for directions) f. Room Types section (vertical list) **FR-STORE-003:** Each room type card in the Room Types section shall display: a. Room name (e.g., "Royal Suite") b. Short description (single line, truncated with ellipsis if too long) c. Price per night (bold, right-aligned) d. No images at this level — text only for fast scanning **FR-STORE-004:** When a user taps a room type card, the system shall navigate to the Room Detail page for that room type.

### 4.4 Room Detail Page

**FR-ROOM-001:** The Room Detail page shall display a swipeable photo gallery of the selected room type. **FR-ROOM-002:** The gallery shall support a maximum of 8 images per room type. **FR-ROOM-003:** The gallery shall display dot indicators showing current image position. **FR-ROOM-004:** Below the gallery, the system shall display: a. Room name (H2) b. Full description c. Capacity (e.g., "Sleeps 2") d. Price per night (bold) e. "Book This Room" button (sticky at bottom of screen) **FR-ROOM-005:** When a user taps "Book This Room", the system shall require authentication if the user is not logged in. If already logged in, the system shall navigate to the Booking Flow.

### 4.5 Booking Flow

The booking flow consists of 4 sequential steps. Each step is a full-screen page. The user sees a progress indicator ("Step X of 4") at the top of each page.

**FR-BOOK-001 (Step 1 — Guests):** The system shall display a number input for "Number of Guests" with a default value of 2. The minimum value is 1. The maximum value is the room type's capacity. The user taps "Continue" to proceed.

**FR-BOOK-002 (Step 2 — Dates):** The system shall display a check-in date picker and a check-out date picker. The check-in date cannot be before today. The check-out date must be after the check-in date. The system shall calculate the number of nights as the difference between check-out and check-in dates. The user taps "Continue" to proceed.

**FR-BOOK-003 (Step 3 — Price Summary):** The system shall display a summary card: a. Room name b. Price per night c. Number of nights d. Total amount (price per night multiplied by number of nights) e. Commission (10% of total, displayed as "Service fee") f. Grand total (total amount, inclusive of commission — the commission is deducted from the hotel's payout, not added to the user's payment)

The user sees the total they will pay. The user taps "Pay Now" to proceed.

**FR-BOOK-004 (Step 4 — Payment):** The system shall initiate a Paystack transaction for the grand total amount. The user shall be redirected to Paystack's checkout page. The system shall create a booking record with status PENDING before redirecting to Paystack.

**FR-BOOK-005 (Availability Check):** Before creating a booking, the system shall check if the selected room type has availability for the requested dates. Each room type has a "quantity" field (number of rooms of that type). The system shall count existing bookings that overlap with the requested dates and have a status of PENDING, PAID, or CONFIRMED. If the count equals or exceeds the room type's quantity, the system shall reject the booking with an error: "This room is fully booked for the selected dates."

**FR-BOOK-006 (Booking Expiry):** If a booking remains in PENDING status (unpaid) for more than 30 minutes after creation, the system shall automatically cancel the booking and release the held availability.

### 4.6 Payment Processing

**FR-PAY-001:** The system shall use Paystack as the sole payment gateway for the MVP. **FR-PAY-002:** The system shall initiate payment by calling Paystack's Transaction Initialize API with the following parameters: a. email (user's email) b. amount (grand total in kobo — 1 NGN = 100 kobo) c. reference (unique transaction reference generated by the system) d. callback\_url (URL of the payment callback page in the Next.js app) **FR-PAY-003:** After the user completes payment on Paystack, Paystack shall redirect the user to the callback URL with a transaction reference query parameter. **FR-PAY-004:** The system shall verify the payment by calling Paystack's Transaction Verify API with the transaction reference. The system shall not trust the redirect URL alone. **FR-PAY-005:** The system shall also configure a Paystack webhook endpoint to receive payment notifications. The webhook endpoint shall verify the Paystack signature and update the booking status. The webhook is the source of truth, not the redirect. **FR-PAY-006:** Upon successful payment verification, the system shall: a. Update the booking status to PAID b. Generate a QR code containing: booking ID, hotel ID, room type ID, guest name, check-in date, check-out date, number of guests, payment amount, and an HMAC-SHA256 signature c. Store the QR code data and signature in the booking record d. Send a confirmation email to the user with the QR code attached **FR-PAY-007:** Upon failed payment, the system shall: a. Keep the booking status as PENDING b. Display an error message to the user c. Allow the user to retry payment from the booking detail page

### 4.7 QR Code System

**FR-QR-001:** The QR code shall contain a JSON payload with the following fields: a. bookingId (string) b. hotelId (string) c. roomTypeId (string) d. guestName (string) e. checkInDate (ISO 8601 date) f. checkOutDate (ISO 8601 date) g. numberOfGuests (integer) h. paymentAmount (integer, in NGN) i. signature (HMAC-SHA256 of the above fields using a server-side secret key) **FR-QR-002:** The QR code shall be rendered as a PNG image on the booking confirmation page and in the booking detail page. **FR-QR-003:** The QR code shall also be sent to the user's email as a PNG attachment. **FR-QR-004:** The QR code signature key shall be stored as an environment variable on the server. It shall never be exposed to the client. **FR-QR-005:** A QR code is valid only if: a. The booking status is PAID or CONFIRMED b. The current date is on or after the check-in date c. The current date is on or before the check-out date plus 1 day d. The signature is valid

### 4.8 Hotel Manager Features

**FR-HM-001:** A hotel manager shall be able to create a hotel profile with: a. Hotel name (required, max 100 characters) b. Description (optional, max 500 characters) c. Address (required, text input) d. Location (latitude and longitude, selected by dropping a pin on a map) e. Cover image (required, JPEG or PNG, max 5MB) f. Amenities (multi-select from predefined list) **FR-HM-002:** A hotel manager shall be able to add room types to their hotel with: a. Room name (required, max 50 characters) b. Description (optional, max 300 characters) c. Price per night (required, integer greater than 0, in NGN) d. Capacity (required, integer 1-20) e. Quantity (required, integer 1-100 — the number of rooms of this type available) f. Photos (1-8 images, JPEG or PNG, max 5MB each) **FR-HM-003:** A hotel manager shall be able to edit and deactivate room types. Deactivated room types do not appear on the Hotel Store Page and cannot be booked. **FR-HM-004:** A hotel manager shall be able to view a list of bookings for their hotel, filtered by status (PENDING, PAID, CONFIRMED, COMPLETED, CANCELLED) and sorted by date. **FR-HM-005:** A hotel manager shall be able to scan a QR code using the device camera within the app. The system shall decode the QR code, verify the signature, check the booking status, and display the booking details. **FR-HM-006:** Upon scanning a valid QR code, the hotel manager shall tap "Confirm Check-in" to: a. Update the booking status to CONFIRMED b. Record the confirmation timestamp c. Create a payout record for the hotel's share (grand total minus commission) d. Display a success message **FR-HM-007:** A hotel manager shall be able to view earnings: a. Total earnings (sum of all CONFIRMED and COMPLETED bookings' hotel payouts) b. Earnings this month c. Commission deducted (total) d. List of confirmed bookings with payout amounts

### 4.9 Admin Features

**FR-ADMIN-001:** An admin shall be able to view a list of pending hotel registrations. **FR-ADMIN-002:** An admin shall be able to approve or reject a hotel. Rejected hotels shall receive a notification email with the reason. **FR-ADMIN-003:** An admin shall be able to set the global commission rate (percentage, 0-50%, default 10%). **FR-ADMIN-004:** An admin shall be able to view platform analytics: a. Total hotels (approved, pending, suspended) b. Total bookings (by status) c. Total revenue (sum of all PAID and CONFIRMED booking amounts) d. Total commission earned e. Bookings and revenue for the current month **FR-ADMIN-005:** An admin shall be able to suspend a hotel. Suspended hotels do not appear on the For You page and cannot receive new bookings. Existing bookings remain valid.

## 5. NON-FUNCTIONAL REQUIREMENTS

**NFR-001 (Performance):** The For You page shall load in under 3 seconds on a 4G connection. **NFR-002 (Performance):** Hotel search results shall return in under 2 seconds. **NFR-003 (Performance):** Payment initiation shall complete in under 5 seconds. **NFR-004 (Availability):** The application shall target 99.5% uptime. **NFR-005 (Security):** All API communications shall use HTTPS (TLS 1.2 or higher). **NFR-006 (Security):** Passwords shall be hashed using bcrypt with cost factor 12. **NFR-007 (Security):** JWT tokens shall be signed using RS256 algorithm. **NFR-008 (Security):** All user input shall be validated server-side using Zod schemas. **NFR-009 (Security):** The application shall be compliant with the Nigeria Data Protection Act (NDPA) 2023. User data shall be encrypted at rest. Users shall be able to request data deletion. **NFR-010 (Compatibility):** The application shall be responsive and functional on devices with viewport widths from 320px to 1920px. The design is mobile-first. **NFR-011 (Compatibility):** The application shall be tested on Chrome, Safari, and Firefox (latest versions). **NFR-012 (Scalability):** The system shall support 500 concurrent users and 1,000 hotels at MVP scale. **NFR-013 (Logging):** All API errors shall be logged with timestamp, user ID (if authenticated), request path, and error message. **NFR-014 (Rate Limiting):** Authentication endpoints shall be limited to 5 requests per minute per IP. All other endpoints shall be limited to 60 requests per minute per authenticated user.

## 6. BUSINESS RULES

**BR-001:** The default commission rate is 10% of the booking grand total. The commission is deducted from the hotel's payout, not added to the user's payment. The user pays the room price. The hotel receives the room price minus 10%. **BR-002:** A hotel must be approved by an admin before appearing on the For You page. **BR-003:** A hotel manager can only manage their own hotel. They cannot view or edit other hotels. **BR-004:** A booking can be cancelled by the user up to 24 hours before the check-in date. The user receives a full refund. Within 24 hours of check-in, the booking is non-refundable. **BR-005:** A booking can be cancelled by the hotel manager at any time. The user receives a full refund. The hotel manager must provide a reason. **BR-006:** Refunds in the MVP are processed manually by the admin via Paystack dashboard. Automated refund processing is a post-MVP feature. **BR-007:** A hotel that has been suspended cannot receive new bookings. Existing bookings remain valid and must be honored. **BR-008:** The currency is Nigerian Naira (NGN). All prices are stored as integers (kobo) in the database to avoid floating point errors. Display values are converted to Naira with no decimal places. **BR-009:** All monetary amounts in the database are stored as integers in kobo (1 NGN = 100 kobo). **BR-010:** The minimum price per night for any room is 1,000 NGN. The maximum is 10,000,000 NGN.

## 7. ACCEPTANCE CRITERIA

**AC-001:** An unauthenticated user can browse the For You page, open a hotel store page, and view room details without logging in. **AC-002:** An authenticated booker can complete the full booking flow: select room, enter guests, select dates, see price summary, pay via Paystack (test mode), and receive a QR code. **AC-003:** A hotel manager can create a hotel profile, add room types with photos, and the hotel appears on the For You page after admin approval. **AC-004:** A hotel manager can scan a QR code and confirm a booking, triggering a payout record. **AC-005:** An admin can approve a hotel, set commission rate, and view platform analytics. **AC-006:** The For You page loads in under 3 seconds on a 4G connection. **AC-007:** The booking flow prevents double-booking when room quantity is exhausted for overlapping dates. **AC-008:** The QR code verification rejects forged QR codes with invalid signatures. **AC-009:** The application is responsive on mobile (320px), tablet (768px), and desktop (1280px) viewports. **AC-010:** The Paystack webhook correctly updates booking status when payment is confirmed.

## 8. ASSUMPTIONS AND CONSTRAINTS

**AS-001:** Paystack is available and operational in Nigeria. **AS-002:** Google Maps API is available with a valid API key. **AS-003:** AWS S3 is available for image storage. **AS-004:** The application is deployed on Vercel or AWS. **AS-005:** The MVP targets the Nigerian market only. Internationalization is out of scope. **AS-006:** The MVP supports English language only. **AS-007:** Email notifications are sent via a third-party email service (Resend, SendGrid, or Amazon SES).

*End of Document — Monarch Stay PRD v1.0.0*