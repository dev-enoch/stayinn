import { prisma } from "@/lib/prisma";
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

  const room = await prisma.roomType.findUnique({
    where: { id: params.roomId },
    include: {
      hotel: true,
      images: {
        take: 1,
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  if (!room || room.status !== "ACTIVE" || room.hotel.status !== "APPROVED") {
    notFound();
  }

  const serializedRoom = {
    id: room.id,
    hotelId: room.hotelId,
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
