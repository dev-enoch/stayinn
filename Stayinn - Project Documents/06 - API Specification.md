# API SPECIFICATION

## Monarch Stay — Hotel Booking Marketplace (MVP)

### Document Reference: MONARCH_STAY-API-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use

## 1. CONVENTIONS

### 1.1 Base URL

https://monarchstay.ng/api

### 1.2 Content Type

All request and response bodies are JSON. Content-Type: application/json.

### 1.3 Authentication

All endpoints except /auth/register, /auth/login, /auth/refresh, /payments/webhook, and /payments/callback require a Bearer token.

Authorization: Bearer <access\_token>

### 1.4 Response Envelope

Success:

{

"success": true,

"data": { ... },

"message": "Booking created successfully"

}

Error:

{

"success": false,

"error": {

"code": "VALIDATION\_ERROR",

"message": "Number of guests exceeds room capacity.",

"field": "numberOfGuests"

}

}

### 1.5 Pagination

{

"success": true,

"data": {

"items": [ ... ],

"pagination": {

"page": 1,

"limit": 10,

"total": 45,

"hasMore": true

}

}

}

### 1.6 Rate Limiting

| **Endpoint Group** | **Limit** | **Window** |
| --- | --- | --- |
| /auth/\* | 5 requests | per minute per IP |
| /bookings (POST) | 10 requests | per minute per user |
| All other authenticated | 60 requests | per minute per user |

Rate limit headers:

X-RateLimit-Limit: 60

X-RateLimit-Remaining: 59

X-RateLimit-Reset: 1693051200

## 2. AUTHENTICATION

### POST /auth/register

Register a new user.

Request:

{

"fullName": "Enoch Philip",

"email": "enoch@example.com",

"phone": "+2348036930772",

"password": "securepassword123",

"role": "BOOKER"

}

Validation:

* fullName: required, string, min 2 chars, max 100 chars
* email: required, valid email format, unique
* phone: required, string, starts with "+234", unique
* password: required, min 8 chars
* role: required, enum ["BOOKER", "HOTEL\_MANAGER"]

Response (201):

{

"success": true,

"data": {

"user": {

"id": "cm\_abc123",

"fullName": "Enoch Philip",

"email": "enoch@example.com",

"phone": "+2348036930772",

"role": "BOOKER"

},

"accessToken": "eyJ...",

"refreshToken": "eyJ..."

},

"message": "Account created successfully"

}

Errors: | Code | Status | Description | |------|--------|-------------| | VALIDATION\_ERROR | 422 | Invalid input data | | EMAIL\_EXISTS | 409 | Email already registered | | PHONE\_EXISTS | 409 | Phone number already registered |

### POST /auth/login

Request:

{

"identifier": "enoch@example.com",

"password": "securepassword123"

}

Validation:

* identifier: required, string (can be email or phone)
* password: required, string

Response (200):

{

"success": true,

"data": {

"user": { ... },

"accessToken": "eyJ...",

"refreshToken": "eyJ..."

}

}

Errors: | Code | Status | Description | |------|--------|-------------| | INVALID\_CREDENTIALS | 401 | Wrong identifier or password |

### POST /auth/refresh

Uses httpOnly cookie for refresh token. If cookie is not present, falls back to request body.

Request (optional body):

{

"refreshToken": "eyJ..."

}

Response (200):

{

"success": true,

"data": {

"accessToken": "eyJ..."

}

}

### POST /auth/logout

Requires authentication. Revokes the refresh token.

Response (200):

{

"success": true,

"message": "Logged out successfully"

}

## 3. HOTELS

### GET /hotels

List approved hotels with filters and pagination. No authentication required.

Query parameters: | Param | Type | Required | Default | Description | |-------|------|----------|---------|-------------| | lat | number | no | — | User latitude for proximity sorting | | lng | number | no | — | User longitude | | radius | number | no | 50 | Search radius in km (max 500) | | minPrice | number | no | — | Minimum price per night in NGN | | maxPrice | number | no | — | Maximum price per night in NGN | | amenities | string | no | — | Comma-separated amenity codes (WIFI,WATER,BACKUP\_POWER) | | search | string | no | — | Search query (hotel name or area) | | sort | string | no | newest | Sort order: newest, price\_asc, price\_desc, distance | | page | number | no | 1 | Page number | | limit | number | no | 10 | Items per page (max 50) |

Response (200):

{

"success": true,

"data": {

"items": [

{

"id": "cm\_hot\_abc",

"name": "Grand Palace Hotel",

"address": "Graham Road, Maiduguri",

"latitude": 11.8333,

"longitude": 13.1519,

"coverImage": "https://cdn.monarchstay.ng/hotels/cm\_hot\_abc/cover.jpg",

"amenities": ["WIFI", "WATER", "BACKUP\_POWER"],

"startingPrice": 15000,

"distance": 3.2,

"rating": null

}

],

"pagination": {

"page": 1,

"limit": 10,

"total": 45,

"hasMore": true

}

}

}

Note: startingPrice is in NGN (not kobo). It is the lowest pricePerNight among active room types for that hotel.

### GET /hotels/:id

Get full hotel detail with room types and amenities. No authentication required.

Response (200):

{

"success": true,

"data": {

"id": "cm\_hot\_abc",

"name": "Grand Palace Hotel",

"description": "A premium hotel in Maiduguri.",

"address": "Graham Road, Maiduguri",

"latitude": 11.8333,

"longitude": 13.1519,

"coverImage": "https://cdn.monarchstay.ng/hotels/cm\_hot\_abc/cover.jpg",

"amenities": [

{ "code": "WIFI", "label": "Free WiFi" },

{ "code": "WATER", "label": "24/7 Water" },

{ "code": "BACKUP\_POWER", "label": "Backup Electricity" }

],

"roomTypes": [

{

"id": "cm\_rm\_1",

"name": "Royal Suite",

"description": "Spacious suite with king bed and lounge",

"pricePerNight": 25000,

"capacity": 2,

"imageCount": 6

},

{

"id": "cm\_rm\_2",

"name": "Deluxe Room",

"description": "Comfortable room with double bed",

"pricePerNight": 15000,

"capacity": 2,

"imageCount": 4

}

]

}

}

Errors: | Code | Status | Description | |------|--------|-------------| | NOT\_FOUND | 404 | Hotel not found or not approved |

### POST /hotels

Create a hotel. Requires role HOTEL\_MANAGER.

Request:

{

"name": "Grand Palace Hotel",

"description": "A premium hotel in Maiduguri.",

"address": "Graham Road, Maiduguri",

"latitude": 11.8333,

"longitude": 13.1519,

"coverImage": "https://cdn.monarchstay.ng/uploads/abc.jpg",

"amenities": ["WIFI", "WATER", "BACKUP\_POWER"]

}

Validation:

* name: required, string, 2-100 chars
* description: optional, string, max 500 chars
* address: required, string
* latitude: required, number, -90 to 90
* longitude: required, number, -180 to 180
* coverImage: required, string (S3 URL from /upload endpoint)
* amenities: optional, array of amenity codes

Response (201):

{

"success": true,

"data": {

"id": "cm\_hot\_abc",

"name": "Grand Palace Hotel",

"status": "PENDING"

},

"message": "Hotel created. Awaiting admin approval."

}

### PUT /hotels/:id

Update hotel. Requires role HOTEL\_MANAGER and ownership (managerId must match the authenticated user's ID).

### GET /hotels/:hotelId/rooms

List room types for a hotel. No authentication required. Only returns ACTIVE room types.

### POST /hotels/:hotelId/rooms

Add a room type. Requires role HOTEL\_MANAGER and ownership.

Request:

{

"name": "Royal Suite",

"description": "Spacious suite with king bed and lounge",

"pricePerNight": 25000,

"capacity": 2,

"quantity": 5,

"images": ["https://cdn.monarchstay.ng/uploads/room1.jpg", "https://cdn.monarchstay.ng/uploads/room2.jpg"]

}

Validation:

* name: required, string, 2-50 chars
* description: optional, string, max 300 chars
* pricePerNight: required, integer, min 1000, max 10000000 (in NGN)
* capacity: required, integer, min 1, max 20
* quantity: required, integer, min 1, max 100
* images: required, array, 1-8 items, each a valid URL string

Response (201):

{

"success": true,

"data": {

"id": "cm\_rm\_1",

"name": "Royal Suite",

"pricePerNight": 25000,

"capacity": 2,

"quantity": 5,

"status": "ACTIVE"

},

"message": "Room type added successfully"

}

### PUT /hotels/:hotelId/rooms/:roomId

Update a room type. Requires role HOTEL\_MANAGER and ownership.

### GET /hotels/:hotelId/rooms/:roomId

Get room detail with all images. No authentication required.

Response (200):

{

"success": true,

"data": {

"id": "cm\_rm\_1",

"name": "Royal Suite",

"description": "Spacious suite with king bed and lounge",

"pricePerNight": 25000,

"capacity": 2,

"quantity": 5,

"images": [

{ "url": "https://cdn.monarchstay.ng/rooms/rm\_1/img1.jpg", "sortOrder": 0 },

{ "url": "https://cdn.monarchstay.ng/rooms/rm\_1/img2.jpg", "sortOrder": 1 }

]

}

}

## 4. BOOKINGS

### POST /bookings

Create a booking. Requires role BOOKER.

Request:

{

"hotelId": "cm\_hot\_abc",

"roomTypeId": "cm\_rm\_1",

"checkInDate": "2026-09-01",

"checkOutDate": "2026-09-06",

"numberOfGuests": 2

}

Validation:

* hotelId: required, string, must reference an APPROVED hotel
* roomTypeId: required, string, must reference an ACTIVE room type in the specified hotel
* checkInDate: required, date (YYYY-MM-DD), cannot be before today
* checkOutDate: required, date, must be after checkInDate
* numberOfGuests: required, integer, min 1, cannot exceed room type capacity

Server-side calculations:

* numberOfNights = checkOutDate - checkInDate (in days)
* totalAmount = pricePerNight \* numberOfNights (in kobo)
* commissionRate = current global commission rate from CommissionSetting
* commissionAmount = round(totalAmount \* commissionRate) (in kobo)
* hotelPayout = totalAmount - commissionAmount (in kobo)

Availability check:

* Count bookings where roomTypeId matches, status in (PENDING, PAID, CONFIRMED), and dates overlap
* If count >= roomType.quantity, return BOOKING\_NOT\_AVAILABLE error

Response (201):

{

"success": true,

"data": {

"id": "cm\_bk\_1",

"status": "PENDING",

"hotel": { "name": "Grand Palace Hotel" },

"roomType": { "name": "Royal Suite" },

"checkInDate": "2026-09-01",

"checkOutDate": "2026-09-06",

"numberOfNights": 5,

"numberOfGuests": 2,

"totalAmount": 125000,

"commissionRate": 0.1,

"commissionAmount": 12500,

"hotelPayout": 112500,

"expiresAt": "2026-08-26T01:41:00Z"

},

"message": "Booking created. Complete payment within 30 minutes."

}

Note: totalAmount, commissionAmount, and hotelPayout are in NGN (not kobo) in the API response for readability. Stored as kobo in the database.

Errors: | Code | Status | Description | |------|--------|-------------| | NOT\_FOUND | 404 | Hotel or room type not found | | VALIDATION\_ERROR | 422 | Invalid dates, guests, or missing fields | | BOOKING\_NOT\_AVAILABLE | 409 | Room fully booked for requested dates |

### GET /bookings/:id

Get booking detail. Requires authentication. Bookers can only see their own bookings. Managers can see bookings for their hotels.

### GET /bookings/me

Get the authenticated user's bookings.

Query params: status (filter by status), page, limit

### GET /bookings/hotel/:hotelId

Get bookings for a hotel. Requires role HOTEL\_MANAGER and ownership.

Query params: status, page, limit

### POST /bookings/:id/cancel

Cancel a booking.

Booker: can cancel if booking status is PENDING or PAID, and if check-in date is more than 24 hours away (for PAID bookings). PENDING bookings can be cancelled anytime.

Hotel Manager: can cancel any booking for their hotel. Must provide a reason.

Admin: can cancel any booking. Must provide a reason.

Request (optional):

{

"reason": "Guest requested cancellation."

}

### POST /bookings/:id/confirm

Confirm a booking via QR code scan. Requires role HOTEL\_MANAGER.

Request:

{

"qrData": "{\"bookingId\":\"cm\_bk\_1\",\"hotelId\":\"cm\_hot\_abc\",...}",

"qrSignature": "abc123def456..."

}

Server-side:

1. Verify HMAC-SHA256 signature matches qrData
2. Find booking by bookingId from qrData
3. Check booking.hotelId matches the authenticated manager's hotel
4. Check booking.status is PAID
5. Check current date is between checkInDate and (checkOutDate + 1 day)
6. Update booking.status to CONFIRMED
7. Set booking.confirmedAt to now
8. Create Payout record with booking.hotelPayout amount

Response (200):

{

"success": true,

"data": {

"bookingId": "cm\_bk\_1",

"status": "CONFIRMED",

"guestName": "Enoch Philip",

"roomType": "Royal Suite",

"checkInDate": "2026-09-01",

"checkOutDate": "2026-09-06",

"numberOfGuests": 2,

"totalAmount": 125000,

"hotelPayout": 112500,

"confirmedAt": "2026-09-01T10:00:00Z"

},

"message": "Check-in confirmed. Guest can proceed to room."

}

Errors: | Code | Status | Description | |------|--------|-------------| | QR\_INVALID | 400 | Signature mismatch | | QR\_EXPIRED | 400 | Current date outside valid range | | BOOKING\_NOT\_PAID | 409 | Booking is not in PAID status | | FORBIDDEN | 403 | This booking belongs to a different hotel |

## 5. PAYMENTS

### POST /payments/initiate

Initiate a Paystack payment. Requires role BOOKER and ownership of the booking.

Request:

{

"bookingId": "cm\_bk\_1"

}

Server-side:

1. Find booking. Verify ownership (booking.userId === authenticated user ID).
2. Verify booking.status is PENDING.
3. Verify booking has not expired (createdAt + 30 minutes > now).
4. Generate unique payment reference: MONARCH_STAY\_${bookingId}\_${timestamp}.
5. Call Paystack Transaction Initialize API:
   * email: user's email
   * amount: booking.totalAmount (in kobo)
   * reference: generated reference
   * callback\_url: ${APP\_URL}/payments/callback
6. Create Payment record with status INITIATED.

Response (200):

{

"success": true,

"data": {

"authorizationUrl": "https://checkout.paystack.com/abc123xyz",

"reference": "MONARCH_STAY\_cm\_bk\_1\_1693051200"

}

}

### GET /payments/callback

Paystack redirect URL after payment. No authentication required.

Query params: reference (Paystack transaction reference)

Server-side:

1. Call Paystack Transaction Verify API with the reference.
2. If verified and status is success: a. Update Payment status to SUCCESS. b. Update Booking status to PAID. c. Generate QR code data and HMAC-SHA256 signature. d. Store qrData and qrSignature on the booking. e. Queue confirmation email with QR code. f. Redirect to /booking/[id]?status=success
3. If failed: a. Update Payment status to FAILED. b. Redirect to /booking/[id]?status=failed

### POST /payments/webhook

Paystack webhook. No authentication required. Verified via Paystack signature header.

Headers:

x-paystack-signature: <HMAC-SHA512 signature>

Server-side:

1. Verify the x-paystack-signature header using Paystack webhook secret.
2. Parse the event body.
3. If event is "charge.success": a. Find Payment by gatewayReference (event.data.reference). b. If Payment already SUCCESS, return 200 (idempotent). c. Call Paystack Transaction Verify API to double-confirm. d. Update Payment to SUCCESS. e. Update Booking to PAID. f. Generate QR code and signature. g. Queue confirmation email.
4. Return 200 immediately (do not block the webhook response).

Response: 200 OK (empty body)

## 6. ADMIN

### GET /admin/analytics

Get platform-wide analytics. Requires role ADMIN.

Response (200):

{

"success": true,

"data": {

"hotels": {

"total": 120,

"approved": 98,

"pending": 15,

"suspended": 7

},

"bookings": {

"total": 1540,

"pending": 12,

"paid": 45,

"confirmed": 320,

"completed": 1100,

"cancelled": 63

},

"revenue": {

"total": 12500000,

"thisMonth": 2800000

},

"commission": {

"total": 1250000,

"thisMonth": 280000

},

"bookingsLast30Days": [

{ "date": "2026-08-01", "count": 12 },

{ "date": "2026-08-02", "count": 8 }

],

"revenueLast30Days": [

{ "date": "2026-08-01", "amount": 250000 },

{ "date": "2026-08-02", "amount": 180000 }

]

}

}

Note: All amounts in NGN.

### GET /admin/hotels/pending

List pending hotel approvals. Requires role ADMIN.

Response (200):

{

"success": true,

"data": {

"items": [

{

"id": "cm\_hot\_xyz",

"name": "New Grand Hotel",

"manager": { "fullName": "John Doe", "email": "john@example.com" },

"address": "Baga Road, Maiduguri",

"submittedAt": "2026-08-25T14:00:00Z"

}

],

"pagination": { ... }

}

}

### POST /admin/hotels/:id/approve

Approve a hotel. Requires role ADMIN.

Response (200):

{

"success": true,

"data": {

"id": "cm\_hot\_xyz",

"status": "APPROVED"

},

"message": "Hotel approved. Manager has been notified."

}

### POST /admin/hotels/:id/reject

Reject a hotel. Requires role ADMIN.

Request:

{

"reason": "Hotel address could not be verified."

}

### POST /admin/hotels/:id/suspend

Suspend a hotel. Requires role ADMIN.

### POST /admin/hotels/:id/reinstate

Reinstate a suspended hotel. Requires role ADMIN.

### PUT /admin/commission

Set the global commission rate. Requires role ADMIN.

Request:

{

"rate": 0.10

}

Validation:

* rate: required, number, min 0, max 0.5 (0% to 50%)

Response (200):

{

"success": true,

"data": {

"rate": 0.10

},

"message": "Commission rate updated to 10%"

}

## 7. FILE UPLOAD

### POST /upload

Upload an image to S3. Requires authentication (any role).

Request: multipart/form-data

* file: image file (JPEG or PNG, max 5MB)

Response (201):

{

"success": true,

"data": {

"url": "https://cdn.monarchstay.ng/uploads/abc123.jpg"

}

}

Errors: | Code | Status | Description | |------|--------|-------------| | VALIDATION\_ERROR | 422 | File too large or wrong format | | UPLOAD\_FAILED | 500 | S3 upload failed |

*End of Document — Monarch Stay API Specification v1.0.0*