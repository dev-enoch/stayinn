import { Worker, Queue } from "bullmq";
import { redis } from "../redis";
import { Resend } from "resend";

export const emailQueue = new Queue("email-queue", { connection: redis });

const RESEND_API_KEY = process.env.RESEND_API_KEY as string;
const resend = new Resend(RESEND_API_KEY);

export interface BookingConfirmationEmailData {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  hotelName: string;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  qrImageBase64: string;
}

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    if (job.name === "send-booking-confirmation") {
      const data = job.data as BookingConfirmationEmailData;
      console.log(`Processing email job for booking: ${data.bookingId}`);

      if (!RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not defined. Email will not be sent.");
        return { status: "skipped", reason: "Missing API Key" };
      }

      try {
        // The QR code base64 starts with "data:image/png;base64,"
        // We need to strip that prefix for attachments.
        const base64Data = data.qrImageBase64.replace(
          /^data:image\/png;base64,/,
          "",
        );

        await resend.emails.send({
          from: "Monarch Stay <no-reply@monarchstay.ng>",
          to: data.guestEmail,
          subject: `Booking Confirmation - ${data.hotelName}`,
          html: `
          <h1>Your booking is confirmed!</h1>
          <p>Hi ${data.guestName},</p>
          <p>Your stay at <strong>${data.hotelName}</strong> is confirmed.</p>
          <ul>
            <li><strong>Room:</strong> ${data.roomTypeName}</li>
            <li><strong>Check-in:</strong> ${data.checkInDate}</li>
            <li><strong>Check-out:</strong> ${data.checkOutDate}</li>
          </ul>
          <p>Please present the attached QR code upon arrival for check-in.</p>
          <p>Thank you for choosing Monarch Stay!</p>
        `,
          attachments: [
            {
              filename: `booking-${data.bookingId}-qr.png`,
              content: Buffer.from(base64Data, "base64"),
            },
          ],
        });

        console.log(`Email sent successfully to ${data.guestEmail}`);
        return { status: "sent" };
      } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
      }
    }

    return { status: "unknown-job" };
  },
  { connection: redis },
);
