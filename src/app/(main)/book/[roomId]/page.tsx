import { apiClient } from "@/lib/api-client";
import { notFound, redirect } from "next/navigation";
import BookingWizard from "./BookingWizard";
import { getSession } from "@/lib/auth";

export default async function BookRoomPage(
  props: { params: Promise<{ roomId: string }> }
) {
  const params = await props.params;
  const session = await getSession();

  if (!session) {
    redirect(`/login?callbackUrl=/book/${params.roomId}`);
  }

  const response = await apiClient.get(`/api/rooms/${params.roomId}`);

  if (!response.success || !response.data) {
    notFound();
  }

  const room = response.data;

  const serializedRoom = {
    id: room.id,
    hotelId: room.hotel.id,
    name: room.name,
    hotelName: room.hotel.name,
    capacity: room.capacity,
    pricePerNight: room.pricePerNight,
    coverImage: room.images.length > 0 ? room.images[0].url : (room.hotel.coverImage || "")
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <BookingWizard room={serializedRoom} user={session} />
    </div>
  );
}
