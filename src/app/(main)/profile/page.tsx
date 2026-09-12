import React, { Suspense } from "react";
import UpcomingStay, {
  UpcomingStaySkeleton,
} from "@/components/profile/UpcomingStay";
import PastTrips, { PastTripsSkeleton } from "@/components/profile/PastTrips";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfileBookingsPage(props: Props) {
  const searchParams = await props.searchParams;
  const pageParam = searchParams?.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  return (
    <>
      {/* SECTION 1: Upcoming Reservation Highlight */}
      <Suspense fallback={<UpcomingStaySkeleton />}>
        <UpcomingStay />
      </Suspense>

      {/* SECTION 2: Past Trips History */}
      <Suspense fallback={<PastTripsSkeleton />}>
        <PastTrips page={page} />
      </Suspense>
    </>
  );
}
