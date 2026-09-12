# USER FLOW DOCUMENT

## Monarch Stay — Hotel Booking Marketplace (MVP)

### Document Reference: MONARCH_STAY-FLOW-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use

## 1. BOOKER FLOW

### 1.1 Browsing (Unauthenticated)

1. User navigates to the application URL (monarchstay.ng)
2. Splash/landing screen loads briefly (1 second max)
3. For You page renders with hotel cards
4. If location permission is granted, hotels are sorted by proximity
5. If location permission is denied, hotels are sorted by newest first
6. User can use the search bar to search by hotel name or area
7. User can apply filters (price range, amenities, sort)
8. User scrolls through hotel cards (10 per screen, infinite scroll)
9. User taps a hotel card to open the Hotel Store Page

### 1.2 Hotel Store Page

1. Hotel cover image displays at the top (full width, 16:9)
2. Hotel name displays below the image (bold)
3. Hotel address with map pin icon
4. Amenities badges row (horizontally scrollable): WiFi, Water, Backup Power, etc.
5. Map preview (Google Maps embed) showing hotel location pin
6. Tapping the map opens directions to the hotel in Google Maps
7. Room Types section displays below the map
8. Each room type card shows: room name, short description, price per night
9. No images at this level — text only for fast scanning
10. User taps a room type card to open Room Detail

### 1.3 Room Detail Page

1. Photo gallery displays at the top (swipeable, dot indicators)
2. Room name displays below gallery (bold, H2)
3. Full description text
4. Capacity text: "Sleeps X"
5. Price per night (bold)
6. "Book This Room" button (sticky at bottom)

### 1.4 Authentication Gate

1. If user is not logged in and taps "Book This Room": a. System redirects to login page b. Login page shows: "Log in to continue booking" message c. User can log in or register d. After successful auth, system redirects back to the Room Detail page
2. If user is already logged in: a. System proceeds directly to Booking Step 1

### 1.5 Booking Step 1 — Number of Guests

1. Progress indicator at top: "Step 1 of 4"
2. Title: "How many guests?"
3. Number input with default value of 2
4. Minus button and plus button to adjust (minimum 1, maximum room capacity)
5. "Continue" button at the bottom (disabled if value is 0)
6. Back button at top to return to Room Detail

### 1.6 Booking Step 2 — Dates

1. Progress indicator: "Step 2 of 4"
2. Title: "Select your dates"
3. Check-in date picker (calendar, cannot select past dates)
4. Check-out date picker (calendar, must be after check-in)
5. Number of nights displays automatically: "X nights"
6. "Continue" button at the bottom
7. Back button to return to Step 1

### 1.7 Booking Step 3 — Price Summary

1. Progress indicator: "Step 3 of 4"
2. Title: "Review your booking"
3. Summary card displays: a. Hotel name b. Room type name c. Check-in date (formatted: "Mon, 1 Sep 2026") d. Check-out date e. Number of nights f. Number of guests g. Price per night (NGN, formatted with commas) h. Subtotal (price per night x nights) i. Service fee (10% commission, shown as "Service fee") j. Total (subtotal + service fee — note: service fee is shown for transparency but the commission is deducted from the hotel's payout, the user pays subtotal only)

CORRECTION: The user pays the subtotal (price per night x nights). The service fee (10%) is deducted from the hotel's payout. The user's total equals the subtotal. The service fee is shown as informational text only.

1. "Pay Now" button at the bottom showing the total amount
2. Back button to return to Step 2

### 1.8 Booking Step 4 — Payment

1. Progress indicator: "Step 4 of 4"
2. Title: "Complete payment"
3. Order summary (compact): hotel name, room, dates, total
4. System creates a PENDING booking record
5. System calls Paystack to initialize transaction
6. User is redirected to Paystack checkout page
7. User completes payment on Paystack (card, transfer, USSD)
8. Paystack redirects to callback URL with transaction reference
9. System verifies payment with Paystack Transaction Verify API
10. If payment successful: a. Booking status updated to PAID b. QR code generated with HMAC-SHA256 signature c. Confirmation email sent with QR code d. User redirected to Booking Confirmation page
11. If payment failed: a. User sees payment failed screen b. "Retry Payment" button c. "Cancel Booking" button

### 1.9 Booking Confirmation Page

1. Success indicator (green checkmark, animated)
2. "Booking confirmed" heading
3. QR code displayed (large, centered, white background)
4. Booking details below QR code: a. Hotel name b. Room type c. Check-in and check-out dates d. Number of guests e. Amount paid
5. Two buttons: a. "Save QR Code" — downloads QR code as PNG b. "View on Map" — opens Google Maps directions to hotel
6. Text below: "Present this QR code at the hotel front desk for check-in."
7. "View My Bookings" link

### 1.10 At the Hotel (Check-in)

1. User opens the app
2. Navigates to "My Bookings"
3. Finds the booking and taps to open booking detail
4. QR code displays on screen
5. User presents phone to hotel front desk
6. Hotel manager scans QR code with their device
7. Both screens show confirmation
8. User proceeds to room

### 1.11 My Bookings Page

1. List of user's bookings, sorted by check-in date (upcoming first)
2. Each booking card shows: a. Hotel name and cover image thumbnail b. Room type c. Check-in and check-out dates d. Status badge (PENDING, PAID, CONFIRMED, COMPLETED, CANCELLED)
3. Tapping a booking opens the Booking Detail page
4. If booking is PAID, QR code is displayed on the detail page
5. If booking is PENDING, "Complete Payment" button is shown
6. If booking is more than 24 hours before check-in, "Cancel Booking" button is shown

## 2. HOTEL MANAGER FLOW

### 2.1 Registration

1. User navigates to registration page
2. Selects role: "I want to list my hotel" (HOTEL\_MANAGER)
3. Enters: full name, email, phone, password
4. Account is created with role HOTEL\_MANAGER
5. User is redirected to Hotel Setup page

### 2.2 Hotel Setup

1. Title: "Set up your hotel"
2. Step 1: Hotel Information a. Hotel name (required, text input) b. Description (optional, textarea, max 500 chars) c. Address (required, text input) d. Location: Map with draggable pin. Manager drops pin on their hotel location. Latitude and longitude are captured automatically.
3. Step 2: Cover Image a. Upload hotel cover image (exterior or entrance) b. Preview before upload c. Crop to 16:9 ratio
4. Step 3: Amenities a. Checkbox list of amenities b. Select all that apply
5. Step 4: Submit for Approval a. Review all entered information b. "Submit for Review" button c. Hotel status set to PENDING d. Manager sees message: "Your hotel is under review. We will notify you when it is approved."
6. Manager cannot add room types until hotel is APPROVED

### 2.3 Hotel Approved

1. Manager receives email notification: "Your hotel has been approved"
2. Manager logs in and sees dashboard
3. Dashboard shows: "Add your first room type" prompt

### 2.4 Adding Room Types

1. Manager navigates to "Rooms" section
2. Taps "Add Room Type"
3. Form fields: a. Room name (e.g., "Royal Suite") — required, max 50 chars b. Description — optional, max 300 chars c. Price per night — required, integer, min 1000, max 10000000 (in NGN) d. Capacity — required, integer, min 1, max 20 e. Quantity — required, integer, min 1, max 100 (number of rooms of this type) f. Photos — upload 1-8 images (JPEG/PNG, max 5MB each)
4. Manager saves room type
5. Room type appears on hotel store page immediately (if hotel is APPROVED)

### 2.5 Managing Bookings

1. Dashboard shows summary: pending arrivals today, confirmed this week, earnings this month
2. "Bookings" section shows all hotel bookings
3. Filter by status (PENDING, PAID, CONFIRMED, COMPLETED, CANCELLED)
4. Each booking card shows: guest name, room type, check-in date, status, amount
5. Tapping a booking shows full detail

### 2.6 QR Scanner (Check-in)

1. Manager navigates to "Scanner" section
2. Camera opens within the app (html5-qrcode)
3. Manager scans the guest's QR code
4. System decodes QR and sends to server for verification
5. If valid: a. Booking details display: guest name, room type, dates, guests, amount paid, hotel payout b. "Confirm Check-in" button
6. Manager taps "Confirm Check-in"
7. System updates booking to CONFIRMED
8. Payout record created for hotel's share
9. Success screen: "Check-in confirmed. Guest can proceed to room."
10. If invalid (bad signature, wrong hotel, expired): a. Error screen: "Invalid QR code. Please verify the booking manually." b. Manager can search for booking by guest name or booking ID as fallback

### 2.7 Earnings View

1. Manager navigates to "Earnings" section
2. Summary cards: a. Total earnings (all confirmed and completed bookings) b. This month's earnings c. Commission deducted (total)
3. Table of confirmed bookings: a. Date b. Guest name c. Room type d. Booking amount e. Commission (10%) f. Payout amount (amount minus commission)

## 3. ADMIN FLOW

### 3.1 Admin Dashboard

1. Admin logs in (admin account pre-created in database)
2. Dashboard displays: a. Total approved hotels b. Pending hotel approvals (count, with link to approvals page) c. Total bookings d. Total revenue e. Total commission earned f. Bookings this month g. Revenue this month
3. Charts: a. Bookings over last 30 days (bar chart) b. Revenue over last 30 days (line chart)

### 3.2 Hotel Approvals

1. Admin navigates to "Approvals" section
2. List of pending hotel registrations
3. Each item shows: hotel name, manager name, address, submitted date
4. Admin taps to review full hotel details
5. Admin can "Approve" or "Reject"
6. If rejected: admin enters rejection reason (required)
7. Hotel manager receives email notification (approved or rejected with reason)

### 3.3 Commission Management

1. Admin navigates to "Settings"
2. Current commission rate displayed (default: 10%)
3. Input to change rate (0-50%)
4. "Update" button
5. New rate applies to all new bookings. Existing bookings retain the rate at time of booking.

### 3.4 Hotel Management

1. Admin can view all hotels (approved, pending, suspended)
2. Admin can suspend a hotel (button on hotel detail page)
3. Suspended hotels do not appear on For You page
4. Admin can reinstate a suspended hotel

### 3.5 Analytics

1. Total hotels by status
2. Bookings by status (pie chart)
3. Revenue over time (line chart)
4. Top 10 hotels by booking count
5. Top 10 hotels by revenue

## 4. EDGE CASES AND ERROR HANDLING

### 4.1 Double Booking

* Scenario: Two users try to book the last available room for overlapping dates simultaneously
* Handling: The database enforces a transaction. The first booking succeeds. The second booking triggers an availability check that fails. The second user sees: "This room was just booked. Please try different dates or another room."

### 4.2 Payment Timeout

* Scenario: User starts payment but closes the browser during Paystack checkout
* Handling: Booking remains PENDING. After 30 minutes, the background job cancels the booking and releases availability. If the user returns and payment was actually completed, the Paystack webhook will still update the booking. If the booking was already cancelled, the webhook handler creates a manual refund request for the admin to process.

### 4.3 QR Code Expired

* Scenario: User presents QR code after the check-out date + 1 day
* Handling: QR scan returns error: "This booking has expired. Please contact Monarch Stay support."

### 4.4 Hotel Goes Offline During Booking

* Scenario: Hotel is suspended after a user has paid but before check-in
* Handling: The booking remains valid. The hotel manager can still scan the QR code. Suspension only prevents new bookings.

### 4.5 Network Failure During Payment

* Scenario: User loses internet after paying on Paystack but before the redirect loads
* Handling: The Paystack webhook will still fire (Paystack retries webhooks for up to 72 hours). The webhook updates the booking to PAID and sends the QR code email. The user can check "My Bookings" when they reconnect.

### 4.6 Invalid QR Code (Forged)

* Scenario: Someone presents a QR code with a tampered signature
* Handling: Server-side HMAC-SHA256 verification fails. QR scan returns: "Invalid QR code." No booking is confirmed.

*End of Document — Monarch Stay User Flow v1.0.0*