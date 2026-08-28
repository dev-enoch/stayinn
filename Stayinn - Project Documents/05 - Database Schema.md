# DATABASE SCHEMA

## Stayinn — Hotel Booking Marketplace (MVP)

### Document Reference: STAYINN-DB-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use

## 1. DATABASE ENGINE

PostgreSQL 16. Accessed via Prisma ORM. All monetary values are stored as integers in kobo (1 NGN = 100 kobo) to prevent floating point errors. Dates are stored as UTC. Timestamps are stored as UTC with timezone.

## 2. PRISMA SCHEMA

generator client {

provider = "prisma-client-js"

}

datasource db {

provider = "postgresql"

url = env("DATABASE\_URL")

}

// ============================================

// USER

// ============================================

model User {

id String @id @default(cuid())

email String @unique

phone String @unique

passwordHash String

fullName String

role Role @default(BOOKER)

createdAt DateTime @default(now()) @db.Timestamptz

updatedAt DateTime @updatedAt @db.Timestamptz

hotels Hotel[]

bookings Booking[]

payments Payment[]

@@index([role])

}

enum Role {

BOOKER

HOTEL\_MANAGER

ADMIN

}

// ============================================

// HOTEL

// ============================================

model Hotel {

id String @id @default(cuid())

managerId String

manager User @relation(fields: [managerId], references: [id], onDelete: Cascade)

name String

description String? @db.Text

address String

latitude Float

longitude Float

coverImage String?

status HotelStatus @default(PENDING)

createdAt DateTime @default(now()) @db.Timestamptz

updatedAt DateTime @updatedAt @db.Timestamptz

amenities HotelAmenity[]

roomTypes RoomType[]

bookings Booking[]

payouts Payout[]

@@index([status])

@@index([latitude, longitude])

@@index([managerId])

}

enum HotelStatus {

PENDING

APPROVED

SUSPENDED

}

// ============================================

// HOTEL AMENITY (many-to-many)

// ============================================

model HotelAmenity {

id String @id @default(cuid())

hotelId String

hotel Hotel @relation(fields: [hotelId], references: [id], onDelete: Cascade)

amenity Amenity

@@unique([hotelId, amenity])

@@index([hotelId])

}

enum Amenity {

WIFI

WATER

BACKUP\_POWER

PARKING

POOL

GYM

RESTAURANT

AIR\_CONDITIONING

}

// ============================================

// ROOM TYPE (the "menu" of a hotel)

// ============================================

model RoomType {

id String @id @default(cuid())

hotelId String

hotel Hotel @relation(fields: [hotelId], references: [id], onDelete: Cascade)

name String

description String? @db.Text

pricePerNight Int // Stored in kobo (NGN \* 100). Min: 100000 (1000 NGN). Max: 1000000000 (10000000 NGN).

capacity Int @default(2) // Max guests per room. Min: 1. Max: 20.

quantity Int @default(1) // Number of rooms of this type. Min: 1. Max: 100.

status RoomStatus @default(ACTIVE)

createdAt DateTime @default(now()) @db.Timestamptz

updatedAt DateTime @updatedAt @db.Timestamptz

images RoomImage[]

bookings Booking[]

@@index([hotelId])

@@index([status])

}

enum RoomStatus {

ACTIVE

INACTIVE

}

// ============================================

// ROOM IMAGE

// ============================================

model RoomImage {

id String @id @default(cuid())

roomTypeId String

roomType RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)

url String // S3 URL

sortOrder Int @default(0)

@@index([roomTypeId])

}

// ============================================

// BOOKING (the core transaction)

// ============================================

model Booking {

id String @id @default(cuid())

userId String

user User @relation(fields: [userId], references: [id])

hotelId String

hotel Hotel @relation(fields: [hotelId], references: [id])

roomTypeId String

roomType RoomType @relation(fields: [roomTypeId], references: [id])

checkInDate DateTime @db.Date

checkOutDate DateTime @db.Date

numberOfGuests Int

numberOfNights Int

totalAmount Int // In kobo. Amount the user pays (room price \* nights).

commissionRate Decimal @db.Decimal(5, 4) // e.g., 0.1000 for 10%

commissionAmount Int // In kobo. totalAmount \* commissionRate.

hotelPayout Int // In kobo. totalAmount - commissionAmount.

status BookingStatus @default(PENDING)

qrData String? @db.Text // JSON payload for QR code

qrSignature String? // HMAC-SHA256 signature

confirmedAt DateTime? @db.Timestamptz

cancelledAt DateTime? @db.Timestamptz

cancelReason String?

createdAt DateTime @default(now()) @db.Timestamptz

updatedAt DateTime @updatedAt @db.Timestamptz

payment Payment?

payout Payout?

@@index([hotelId, checkInDate, checkOutDate])

@@index([userId])

@@index([status])

@@index([roomTypeId])

}

enum BookingStatus {

PENDING // Created, awaiting payment. Auto-cancels after 30 minutes.

PAID // Payment confirmed by Paystack. QR code generated.

CONFIRMED // Hotel manager scanned QR and confirmed check-in.

COMPLETED // Check-out date has passed. Set by daily job.

CANCELLED // Cancelled by user, hotel, or system (expiry).

NO\_SHOW // Paid but not confirmed by check-out date. Set by daily job.

}

// ============================================

// PAYMENT (Paystack transaction record)

// ============================================

model Payment {

id String @id @default(cuid())

bookingId String @unique

booking Booking @relation(fields: [bookingId], references: [id])

userId String

user User @relation(fields: [userId], references: [id])

amount Int // In kobo. Amount charged via Paystack.

gateway PaymentGateway @default(PAYSTACK)

gatewayReference String @unique // Paystack transaction reference

status PaymentStatus @default(INITIATED)

createdAt DateTime @default(now()) @db.Timestamptz

updatedAt DateTime @updatedAt @db.Timestamptz

@@index([bookingId])

@@index([status])

}

enum PaymentGateway {

PAYSTACK

}

enum PaymentStatus {

INITIATED

SUCCESS

FAILED

REFUNDED

}

// ============================================

// PAYOUT (money sent to hotel after check-in)

// ============================================

model Payout {

id String @id @default(cuid())

hotelId String

hotel Hotel @relation(fields: [hotelId], references: [id])

bookingId String @unique

booking Booking @relation(fields: [bookingId], references: [id])

amount Int // In kobo. hotelPayout amount.

status PayoutStatus @default(PENDING)

reference String? // Bank transfer reference (for manual processing in MVP)

createdAt DateTime @default(now()) @db.Timestamptz

processedAt DateTime? @db.Timestamptz

@@index([hotelId])

}

enum PayoutStatus {

PENDING // Created when booking is confirmed. Awaiting manual processing.

PROCESSING // Admin initiated transfer via Paystack dashboard.

SUCCESS // Transfer completed.

FAILED // Transfer failed.

}

// ============================================

// COMMISSION SETTING (admin-managed)

// ============================================

model CommissionSetting {

id String @id @default(cuid())

rate Decimal @db.Decimal(5, 4) @default(0.1000) // 10% default

active Boolean @default(true)

createdAt DateTime @default(now()) @db.Timestamptz

updatedAt DateTime @updatedAt @db.Timestamptz

}

## 3. ENTITY RELATIONSHIPS

User 1:N Hotel

User 1:N Booking

User 1:N Payment

Hotel 1:N HotelAmenity

Hotel 1:N RoomType

Hotel 1:N Booking

Hotel 1:N Payout

RoomType 1:N RoomImage

RoomType 1:N Booking

Booking 1:1 Payment

Booking 1:1 Payout

## 4. INDEXES (Summary)

| **Table** | **Index** | **Purpose** |
| --- | --- | --- |
| User | email (unique) | Login lookup |
| User | phone (unique) | Login lookup |
| User | role | Admin queries by role |
| Hotel | status | Filter approved hotels for For You page |
| Hotel | latitude, longitude | Proximity-based search |
| Hotel | managerId | Manager's own hotel lookup |
| HotelAmenity | hotelId, amenity (unique) | Prevent duplicate amenities |
| RoomType | hotelId | List rooms for a hotel |
| RoomType | status | Filter active rooms only |
| RoomImage | roomTypeId | List images for a room |
| Booking | hotelId, checkInDate, checkOutDate | Availability check (overlap query) |
| Booking | userId | User's bookings list |
| Booking | status | Filter by status |
| Booking | roomTypeId | Room booking count for availability |
| Payment | gatewayReference (unique) | Idempotency on webhook |
| Payment | bookingId (unique) | One payment per booking |
| Payout | hotelId | Hotel payout history |
| Payout | bookingId (unique) | One payout per booking |

## 5. DATA INTEGRITY RULES

1. A booking can only be created if the room type status is ACTIVE and the hotel status is APPROVED.
2. A booking's numberOfGuests cannot exceed the room type's capacity.
3. A booking's checkOutDate must be after checkInDate.
4. A booking's numberOfNights must equal the difference between checkOutDate and checkInDate in days.
5. A booking's totalAmount must equal pricePerNight \* numberOfNights.
6. A booking's commissionAmount must equal totalAmount \* commissionRate (rounded to nearest kobo).
7. A booking's hotelPayout must equal totalAmount - commissionAmount.
8. The number of overlapping bookings (status: PENDING, PAID, or CONFIRMED) for a room type must not exceed the room type's quantity.
9. A payment's gatewayReference must be unique (prevents duplicate webhook processing).
10. A payout is only created when a booking transitions to CONFIRMED.
11. When a hotel is deleted (CASCADE), all related room types, room images, amenities, and bookings are deleted. Payments and payouts are NOT deleted (financial records must be retained).

## 6. AVAILABILITY CHECK QUERY

To check if a room type is available for requested dates:

SELECT COUNT(\*) as overlapping\_bookings

FROM "Booking"

WHERE "roomTypeId" = $roomTypeId

AND "status" IN ('PENDING', 'PAID', 'CONFIRMED')

AND "checkInDate" < $requestedCheckOutDate

AND "checkOutDate" > $requestedCheckInDate;

If overlapping\_bookings >= roomType.quantity, the room is fully booked.

## 7. INITIAL DATA

On deployment, the following records must be created:

1. Admin user: email set via environment variable (ADMIN\_EMAIL), password set via environment variable (ADMIN\_PASSWORD), hashed with bcrypt. Role: ADMIN.
2. Commission setting: rate 0.1000 (10%), active: true.

*End of Document — Stayinn Database Schema v1.0.0*