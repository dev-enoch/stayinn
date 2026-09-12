import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackSignature, verifyTransaction } from "@/lib/paystack";
import { generateBookingQR } from "@/lib/qr";
import { emailQueue } from "@/lib/queue/emailQueue";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 400 },
      );
    }

    const text = await req.text();

    if (!verifyPaystackSignature(text, signature)) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 },
      );
    }

    const event = JSON.parse(text);

    if (event.event === "charge.success") {
      const reference = event.data.reference;

      const payment = await prisma.payment.findUnique({
        where: { gatewayReference: reference },
        include: {
          booking: {
            include: {
              user: true,
              hotel: true,
              roomType: true,
            },
          },
        },
      });

      if (!payment) {
        return NextResponse.json(
          { success: false, message: "Payment not found" },
          { status: 200 },
        );
      }

      const { booking } = payment;

      // Idempotency check: if already processed, return 200 early
      if (payment.status === "SUCCESS" && booking.status === "PAID") {
        return NextResponse.json(
          { success: true, message: "Already processed" },
          { status: 200 },
        );
      }

      // 1. Double verify with Paystack to ensure no spoofing
      const verifyRes = await verifyTransaction(reference);

      if (verifyRes.data.status === "success") {
        // 2. Process confirmation in a transaction
        await prisma.$transaction(async (tx) => {
          await tx.payment.update({
            where: { id: payment.id },
            data: { status: "SUCCESS" },
          });

          await tx.booking.update({
            where: { id: booking.id },
            data: { status: "PAID" },
          });
        });

        // 3. Generate QR code payload and signature
        const qrPayload = {
          bookingId: booking.id,
          hotelId: booking.hotelId,
          roomTypeId: booking.roomTypeId,
          guestName: booking.user.fullName,
          checkInDate: booking.checkInDate.toISOString(),
          checkOutDate: booking.checkOutDate.toISOString(),
          numberOfGuests: booking.numberOfGuests,
        };

        const qrResult = await generateBookingQR(qrPayload);

        // Save the generated QR data to the booking
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            qrData: qrResult.qrData,
            qrSignature: qrResult.qrSignature,
          },
        });

        // 4. Queue the confirmation email
        await emailQueue.add("send-booking-confirmation", {
          bookingId: booking.id,
          guestName: booking.user.fullName,
          guestEmail: booking.user.email,
          hotelName: booking.hotel.name,
          roomTypeName: booking.roomType.name,
          checkInDate: booking.checkInDate.toISOString().split("T")[0],
          checkOutDate: booking.checkOutDate.toISOString().split("T")[0],
          qrImageBase64: qrResult.qrImageBase64,
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Payment Webhook Error:", error);
    // Always return 200 to Paystack so it doesn't keep retrying unnecessarily
    // unless it's a transient failure we want retried.
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 },
    );
  }
}
