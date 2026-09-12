import { Worker, Queue } from "bullmq";
import { redis } from "../redis";
import { prisma } from "../prisma";

export const bookingQueue = new Queue("booking-expiry", { connection: redis });

// In a real application, this worker would be started in a separate Node.js process,
// or initialized once at server startup (e.g., in a custom Next.js server).
// For this MVP, we define the worker here.

export const bookingWorker = new Worker(
  "booking-expiry",
  async (job) => {
    console.log("Running booking expiry job:", job.id);

    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);

    const expiredBookings = await prisma.booking.findMany({
      where: {
        status: "PENDING",
        createdAt: { lt: thirtyMinsAgo },
      },
    });

    for (const booking of expiredBookings) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          cancelReason: "Payment timeout (30 minutes)",
        },
      });
      console.log(`Cancelled expired booking: ${booking.id}`);
    }

    return { cancelledCount: expiredBookings.length };
  },
  { connection: redis },
);

// Add a repeatable job to run every 1 minute
export async function setupBookingExpiryCron() {
  await bookingQueue.upsertJobScheduler("check-expired-bookings", {
    pattern: "* * * * *",
  });
}
