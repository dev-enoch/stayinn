# DESIGN SYSTEM AND UI GUIDELINES

## Stayinn — Hotel Booking Marketplace (MVP)

### Document Reference: STAYINN-DESIGN-001

**Version:** 1.0.0 **Date:** August 26, 2026 **Classification:** Internal — Development Use

## 1. DESIGN PHILOSOPHY

The application follows three principles:

1. One decision per screen. The user faces one choice at a time. No multi-column layouts competing for attention on mobile.
2. Calm visual rhythm. Generous white space. Content does not touch screen edges. Sections breathe.
3. Progress is always visible. Progress indicators, breadcrumbs, and status badges are present at every multi-step flow.

## 2. COLOR PALETTE

### 2.1 Primary Colors

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| green-600 | #0A7B5E | Primary buttons, active states, key accents |
| green-700 | #065F46 | Hover states, pressed states |
| green-50 | #ECFDF5 | Light backgrounds, badge backgrounds |

### 2.2 Accent Colors

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| yellow-500 | #F5B400 | Price emphasis, highlight text |
| yellow-50 | #FEF3C7 | Price tag backgrounds |

### 2.3 Neutral Colors

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| white | #FFFFFF | Main background, card backgrounds |
| gray-50 | #FAFAFA | Secondary background, section dividers |
| gray-100 | #F3F4F6 | Input borders, card borders |
| gray-400 | #9CA3AF | Placeholder text, secondary labels |
| gray-600 | #4B5563 | Body text |
| gray-900 | #111827 | Headings, primary text |

### 2.4 Semantic Colors

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| green-500 | #10B981 | Success states |
| yellow-500 | #F59E0B | Warning states |
| red-500 | #EF4444 | Error states |
| blue-500 | #3B82F6 | Info states |

### 2.5 Usage Rules

* Green is the dominant brand color. Use for primary CTAs, active navigation, and success indicators.
* Yellow is used sparingly. Only for price emphasis and key highlights. Never for large areas.
* Red is used only for errors and destructive actions (cancel, delete).
* Background is always white or gray-50. No colored backgrounds for large sections.

## 3. TYPOGRAPHY

### 3.1 Font Family

* Primary: Inter (loaded via next/font/google)
* Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
* Fallback: system-ui, -apple-system, sans-serif

### 3.2 Type Scale (Mobile)

| **Token** | **Size** | **Weight** | **Line Height** | **Usage** |
| --- | --- | --- | --- | --- |
| display | 28px | 700 | 1.2 | Page titles (booking steps) |
| h1 | 24px | 700 | 1.25 | Hotel name on store page |
| h2 | 20px | 600 | 1.3 | Section titles, room names |
| h3 | 18px | 600 | 1.35 | Card titles |
| body | 16px | 400 | 1.5 | Body text, descriptions |
| small | 14px | 400 | 1.45 | Secondary text, metadata |
| caption | 12px | 500 | 1.4 | Badges, labels, status |
| price | 20px | 700 | 1.2 | Prices, totals |
| price-lg | 28px | 700 | 1.2 | Grand total on summary page |

### 3.3 Type Scale (Desktop, 768px+)

| **Token** | **Size** | **Weight** |
| --- | --- | --- |
| display | 36px | 700 |
| h1 | 30px | 700 |
| h2 | 24px | 600 |
| h3 | 20px | 600 |
| body | 16px | 400 |
| price | 22px | 700 |
| price-lg | 32px | 700 |

### 3.4 Text Color Rules

* Headings: gray-900
* Body text: gray-600
* Secondary text: gray-400
* Prices: gray-900 (not yellow — yellow is for background highlight only)
* Links: green-600
* Error text: red-500

## 4. SPACING SYSTEM

Base unit: 4px. All spacing values are multiples of 4.

| **Token** | **Value** |
| --- | --- |
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| space-8 | 32px |
| space-10 | 40px |
| space-12 | 48px |
| space-16 | 64px |

### 4.1 Screen Padding (Mobile)

* Horizontal: 16px (space-4)
* Vertical between sections: 24px (space-6)

### 4.2 Screen Padding (Desktop, 768px+)

* Horizontal: 48px (space-12) or container max-width 1200px centered
* Vertical between sections: 32px (space-8)

### 4.3 Card Internal Padding

* All sides: 16px (space-4)

### 4.4 Gap Between Cards

* Vertical: 12px (space-3)

## 5. BORDER RADIUS

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| radius-sm | 6px | Small elements, badges |
| radius-md | 8px | Inputs, buttons |
| radius-lg | 12px | Cards, modals |
| radius-xl | 16px | Image containers |
| radius-full | 9999px | Pills, avatar circles |

## 6. SHADOWS

| **Token** | **Value** | **Usage** |
| --- | --- | --- |
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | Subtle elements |
| shadow-md | 0 4px 6px rgba(0,0,0,0.07) | Cards, dropdowns |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | Modals, overlays |
| shadow-none | none | Flat elements |

Card shadow: shadow-sm on resting, shadow-md on tap/hover.

## 7. COMPONENTS

### 7.1 Hotel Card (For You Page)

* Container: white background, radius-lg, shadow-sm, overflow hidden
* Cover image: full width, 16:9 aspect ratio, radius-xl on top corners, object-cover
* Content padding: space-4 (16px)
* Hotel name: h3, gray-900, single line, ellipsis if overflow
* Location: small text, gray-400, with map pin icon (16px, gray-400)
* Starting price: price text, right-aligned, with "from" prefix in small text above
* Tap feedback: shadow-md on press
* Card width: full width of container minus 16px horizontal padding each side

### 7.2 Amenity Badge

* Shape: pill (radius-full)
* Background: green-50
* Text: green-600, caption size
* Padding: space-1 vertical, space-2 horizontal
* Icon: 16px, green-600, placed left of text
* Spacing between badges: space-2
* Container: horizontally scrollable (overflow-x-auto), no scrollbar visible

### 7.3 Room Type Card (Hotel Store Page)

* Container: white background, 1px border gray-100, radius-lg
* Padding: space-4
* Layout: horizontal flex
* Left: room name (h3) and description (small, gray-400, single line, ellipsis)
* Right: price per night (price, gray-900)
* No image at this level
* Tap feedback: background changes to gray-50
* "Book" chevron icon on the right (gray-400, 20px)

### 7.4 Photo Gallery (Room Detail)

* Container: full width, height 300px on mobile, 400px on desktop
* Images: object-cover, full container size
* Navigation: swipe left/right (touch), arrow buttons (desktop)
* Indicators: dots at bottom center, 6px diameter, gray-400 inactive, green-600 active
* Max 8 images, dot for each image

### 7.5 Booking Step Page

* Full screen (min-height 100vh)
* Top: progress indicator ("Step X of 4") in small text, gray-400, centered
* Progress bar: 4px height, green-600, width = (step/4 \* 100)%
* Title: display size, gray-900, centered, space-6 below progress
* Content: centered, max-width 480px on desktop
* Bottom: sticky CTA button, full width, 56px from bottom on mobile
* Back button: top-left, text "Back", gray-600, no icon needed

### 7.6 Price Summary Card

* Container: white background, radius-lg, shadow-sm, space-4 padding
* Rows: flex, space-between, body text
* Labels: gray-600
* Values: gray-900
* Divider: 1px, gray-100, space-3 margin vertical
* Total row: price-lg, gray-900, bold, with "Total" label in h3 weight

### 7.7 CTA Button

* Primary: green-600 background, white text, body size (16px), weight 600
* Height: 52px
* Width: full (100%)
* Radius: radius-md (8px)
* Padding: space-3 vertical
* Disabled: gray-100 background, gray-400 text
* Pressed: green-700 background
* No border

### 7.8 Secondary Button

* White background, green-600 text, 1px green-600 border
* Same dimensions as primary
* Pressed: green-50 background

### 7.9 Input Field

* Height: 48px
* Background: white
* Border: 1px gray-100, radius-md
* Focus: 1px green-600 border, no glow
* Placeholder: gray-400
* Text: body size, gray-900
* Padding: space-3 horizontal, space-2 vertical
* Error: 1px red-500 border, error message below in red-500, caption size

### 7.10 Status Badge

* Shape: pill (radius-full)
* Padding: space-1 vertical, space-2 horizontal
* Font: caption, weight 500

Status color mapping: | Status | Background | Text | |--------|-----------|------| | PENDING | yellow-50 | yellow-500 (dark) | | PAID | green-50 | green-600 | | CONFIRMED | green-600 | white | | COMPLETED | gray-100 | gray-600 | | CANCELLED | red-50 | red-500 |

### 7.11 QR Code Display

* Background: white
* QR code: 256x256px (mobile), 320x320px (desktop)
* Centered on screen
* White padding around QR: space-8 (32px)
* Booking details below: body text, gray-600, left-aligned, space-4 padding
* Buttons below details: "Save QR Code" (primary) and "View on Map" (secondary)

### 7.12 Bottom Navigation (Booker)

* Fixed at bottom of screen
* Height: 56px + safe area inset
* White background, shadow-sm on top edge
* Three tabs: a. "Explore" (home icon) — For You page b. "Bookings" (calendar icon) — My Bookings c. "Profile" (user icon) — Profile/Settings
* Active tab: green-600 icon and text
* Inactive tab: gray-400 icon and text

### 7.13 Bottom Navigation (Manager)

* Fixed at bottom of screen
* Four tabs: a. "Dashboard" (grid icon) b. "Bookings" (calendar icon) c. "Scanner" (qr-code icon) d. "Profile" (user icon)

## 8. ICONOGRAPHY

Library: Lucide React Stroke width: 1.5px on all icons Sizes: 16px (inline/badges), 20px (navigation/buttons), 24px (section headers), 32px (amenities)

Required icons:

* wifi, droplet, zap (backup power), car (parking), waves (pool), dumbbell (gym), utensils (restaurant), air-vent (AC)
* map-pin, search, filter, calendar, users, qr-code, camera, chevron-right, chevron-left, check, x, arrow-left
* home, grid, user, log-out, settings, image, upload, star

## 9. ANIMATION

| **Element** | **Animation** | **Duration** | **Easing** |
| --- | --- | --- | --- |
| Page transition | Fade in | 200ms | ease-out |
| Modal/overlay | Fade + scale up from 0.95 | 200ms | ease-out |
| QR code reveal | Fade in | 300ms | ease-out |
| Price calculation | Number counts up | 300ms | ease-out |
| Success checkmark | Scale from 0 to 1 with bounce | 400ms | spring |
| Button press | Scale to 0.98 | 100ms | ease-in-out |
| Loading state | Skeleton shimmer | 1500ms loop | ease-in-out |

No animation duration exceeds 400ms. The app should feel snappy, not slow.

## 10. SCREEN LIST AND RESPONSIVE BREAKPOINTS

### 10.1 Breakpoints

* Mobile: 320px to 767px (default, mobile-first)
* Tablet: 768px to 1023px
* Desktop: 1024px and above

### 10.2 Booker Screens

1. For You (hotel discovery)
2. Hotel Store Page
3. Room Detail (photo gallery)
4. Login
5. Register
6. Booking Step 1: Guests
7. Booking Step 2: Dates
8. Booking Step 3: Price Summary
9. Booking Step 4: Payment
10. Booking Confirmation (QR Code)
11. My Bookings
12. Booking Detail
13. Profile/Settings

### 10.3 Hotel Manager Screens

1. Register (manager role)
2. Hotel Setup (multi-step form)
3. Dashboard
4. Rooms List
5. Add/Edit Room Type
6. Bookings List
7. Booking Detail
8. QR Scanner
9. Earnings
10. Profile/Settings

### 10.4 Admin Screens (Desktop-focused, 1024px+)

1. Dashboard (analytics)
2. Hotel Approvals
3. Hotels List
4. Hotel Detail
5. Bookings List
6. Commission Settings
7. Users List

*End of Document — Stayinn Design System v1.0.0*