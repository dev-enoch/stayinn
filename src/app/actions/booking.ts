"use server";

import { apiClient } from "@/lib/api-client";
import { getSession } from "@/lib/auth";

export async function createBookingAndPay(data: {
  roomId: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
}) {
  const session = await getSession();
  if (!session) return { error: "You must be logged in to book" };

  try {
    const response = await apiClient.post("/api/bookings", {
      hotelId: data.hotelId,
      roomTypeId: data.roomId,
      checkInDate: data.checkIn,
      checkOutDate: data.checkOut,
      numberOfGuests: data.guests,
    });

    if (!response.success) {
      return { error: response.error?.message || "Failed to process booking" };
    }

    return { success: true, authorizationUrl: response.data.authorizationUrl };
  } catch (error) {
    console.error("Booking Error:", error);
    return { error: "Failed to process booking" };
  }
}
