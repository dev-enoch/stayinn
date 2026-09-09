import React, { Suspense } from 'react';
import UpcomingStay, { UpcomingStaySkeleton } from '@/components/profile/UpcomingStay';
import PastTrips, { PastTripsSkeleton } from '@/components/profile/PastTrips';

export default function ProfileBookingsPage() {
  return (
    <>
      {/* SECTION 1: Upcoming Reservation Highlight */}
      <Suspense fallback={<UpcomingStaySkeleton />}>
        <UpcomingStay />
      </Suspense>

      {/* SECTION 2: Past Trips History */}
      <Suspense fallback={<PastTripsSkeleton />}>
        <PastTrips />
      </Suspense>
    </>
  );
}
